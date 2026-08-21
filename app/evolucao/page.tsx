import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  evolucao_fisica: "Evolução física",
  musculacao: "Musculação",
  natacao: "Natação",
  corrida: "Corrida",
  outro: "Outro",
};

export default async function EvolucaoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { prisma } = await import("@/lib/db/prisma");
  const records = await prisma.record.findMany({
    where: { userId: user.id },
    orderBy: { recordDate: "desc" },
  });

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link className="text-sm text-zinc-500 hover:text-zinc-900" href="/dashboard">← Dashboard</Link>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">EVOLUI</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">Minha evolução</h1>
            <p className="mt-2 text-sm text-zinc-500">Seu histórico, organizado no tempo.</p>
          </div>
          <Link className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700" href="/registros/novo">+ Novo</Link>
        </div>

        <div className="mt-10 space-y-3">
          {records.length === 0 ? (
            <section className="rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-500 shadow-sm">Nenhum registro ainda.</section>
          ) : records.map((record) => (
            <Link className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400" href={`/registros/${record.id}`} key={record.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-zinc-900">{record.activityName || typeLabels[record.type]}</p>
                  <p className="mt-1 text-sm text-zinc-500">{typeLabels[record.type]}</p>
                </div>
                <time className="shrink-0 text-sm text-zinc-500" dateTime={record.recordDate.toISOString()}>{record.recordDate.toLocaleDateString("pt-BR")}</time>
              </div>
              {record.notes && <p className="mt-4 text-sm leading-6 text-zinc-600">{record.notes}</p>}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}