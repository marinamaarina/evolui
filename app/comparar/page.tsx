import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = { evolucao_fisica: "Evolução física", musculacao: "Musculação", natacao: "Natação", corrida: "Corrida", outro: "Outro" };

export default async function CompararPage({ searchParams }: PageProps<"/comparar">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { prisma } = await import("@/lib/db/prisma");
  const records = await prisma.record.findMany({ where: { userId: user.id }, orderBy: { recordDate: "desc" } });
  const params = await searchParams;
  const selected = [params.a, params.b].map((id) => records.find((record) => record.id === id));

  return <main className="min-h-screen bg-zinc-50 px-6 py-10"><div className="mx-auto max-w-5xl"><Link className="text-sm text-zinc-500 hover:text-zinc-900" href="/dashboard">← Dashboard</Link><h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900">Comparar evolução</h1><p className="mt-2 text-sm text-zinc-500">Escolha dois registros seus para visualizar lado a lado.</p>
    <form className="mt-8 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:grid-cols-3"><select className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900" name="a" defaultValue={params.a ?? ""} required><option value="" disabled>Registro anterior</option>{records.map((record) => <option key={record.id} value={record.id}>{record.recordDate.toLocaleDateString("pt-BR")} · {record.activityName || typeLabels[record.type]}</option>)}</select><select className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900" name="b" defaultValue={params.b ?? ""} required><option value="" disabled>Registro atual</option>{records.map((record) => <option key={record.id} value={record.id}>{record.recordDate.toLocaleDateString("pt-BR")} · {record.activityName || typeLabels[record.type]}</option>)}</select><button className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700" type="submit">Comparar</button></form>
    {selected[0] && selected[1] ? <div className="mt-8 grid gap-4 sm:grid-cols-2">{selected.map((record) => <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm" key={record!.id}><p className="text-xs uppercase tracking-wider text-zinc-400">{typeLabels[record!.type]}</p><h2 className="mt-2 text-xl font-semibold text-zinc-900">{record!.activityName || "Registro"}</h2><p className="mt-1 text-sm text-zinc-500">{record!.recordDate.toLocaleDateString("pt-BR")}</p>{record!.notes && <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-zinc-700">{record!.notes}</p>}<Link className="mt-6 inline-block text-sm font-medium text-zinc-900 underline" href={`/registros/${record!.id}`}>Ver detalhes</Link></section>)}</div> : <p className="mt-8 text-sm text-zinc-500">Selecione dois registros para iniciar a comparação.</p>}
  </div></main>;
}