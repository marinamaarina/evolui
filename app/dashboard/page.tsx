import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/services/supabase/server";
import { logout } from "@/features/auth/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { prisma } = await import("@/lib/db/prisma");
  const records = await prisma.record.findMany({
    where: { userId: user.id },
    orderBy: { recordDate: "desc" },
    take: 10,
  });
  const typeLabels: Record<string, string> = {
    evolucao_fisica: "Evolução física",
    musculacao: "Musculação",
    natacao: "Natação",
    corrida: "Corrida",
    outro: "Outro",
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">EVOLUI</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">Seu progresso começa aqui</h1>
            <p className="mt-2 text-sm text-zinc-500">{user.email}</p>
          </div>
          <form action={logout}><button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-white" type="submit">Sair</button></form>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Total de registros</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900">{records.length}</p>
          </section>
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:col-span-2">
            <p className="text-sm text-zinc-500">Último registro</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">
              {records[0]?.activityName || (records[0] && typeLabels[records[0].type]) || "Nenhum registro ainda"}
            </p>
            {records[0] && <p className="mt-1 text-sm text-zinc-500">{records[0].recordDate.toLocaleDateString("pt-BR")}</p>}
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-zinc-900">Registros recentes</h2>
            <Link className="inline-flex rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700" href="/registros/novo">+ Novo registro</Link>
          </div>
          {records.length === 0 ? (
            <p className="mt-6 text-sm text-zinc-500">Você ainda não adicionou nenhum registro.</p>
          ) : (
            <ul className="mt-6 divide-y divide-zinc-100">
              {records.map((record) => (
                <li className="flex items-center justify-between gap-4 py-4" key={record.id}>
                  <div>
                    <p className="font-medium text-zinc-900">{record.activityName || typeLabels[record.type]}</p>
                    <p className="mt-1 text-sm text-zinc-500">{typeLabels[record.type]}</p>
                  </div>
                  <time className="shrink-0 text-sm text-zinc-500" dateTime={record.recordDate.toISOString()}>{record.recordDate.toLocaleDateString("pt-BR")}</time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}