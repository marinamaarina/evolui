import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import { uploadMedia } from "@/features/records/actions";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  evolucao_fisica: "Evolução física",
  musculacao: "Musculação",
  natacao: "Natação",
  corrida: "Corrida",
  outro: "Outro",
};

export default async function RegistroPage({ params }: PageProps<"/registros/[id]">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { id } = await params;
  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.record.findFirst({
    where: { id, userId: user.id },
    include: { media: { orderBy: { orderIndex: "asc" } } },
  });
  if (!record) notFound();
  const mediaWithUrls = await Promise.all(record.media.map(async (media) => {
    const { data } = await supabase.storage.from("media").createSignedUrl(media.storagePath, 3600);
    return { ...media, url: data?.signedUrl };
  }));

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link className="text-sm text-zinc-500 hover:text-zinc-900" href="/evolucao">← Minha evolução</Link>
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">{typeLabels[record.type]}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">{record.activityName || "Registro"}</h1>
          <time className="mt-2 block text-sm text-zinc-500" dateTime={record.recordDate.toISOString()}>{record.recordDate.toLocaleDateString("pt-BR")}</time>
          {record.notes && <p className="mt-8 whitespace-pre-wrap text-sm leading-7 text-zinc-700">{record.notes}</p>}
          <div className="mt-8 border-t border-zinc-100 pt-6">
            <h2 className="text-sm font-semibold text-zinc-900">Mídias</h2>
            <p className="mt-2 text-sm text-zinc-500">{record.media.length ? `${record.media.length} arquivo(s) anexado(s).` : "Nenhuma mídia anexada ainda."}</p>
            {mediaWithUrls.length > 0 && <div className="mt-5 grid gap-4 sm:grid-cols-2">{mediaWithUrls.map((media) => media.url && (media.type === "video" ? <video className="aspect-video w-full rounded-lg bg-zinc-100 object-cover" controls key={media.id} src={media.url} /> : <img className="aspect-square w-full rounded-lg bg-zinc-100 object-cover" key={media.id} src={media.url} alt="Mídia do registro" />))}</div>}
            <form action={uploadMedia} encType="multipart/form-data" className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <input type="hidden" name="recordId" value={record.id} />
              <div className="flex-1">
                <label className="block text-sm font-medium text-zinc-700" htmlFor="file">Adicionar foto ou vídeo</label>
                <input className="mt-2 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium" id="file" name="file" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime" required />
              </div>
              <button className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700" type="submit">Enviar mídia</button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}