import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/services/supabase/server";
import { logout } from "@/features/auth/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

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
        <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Dashboard em construção</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">A autenticação está funcionando. O próximo passo é criar o banco de registros e permitir o envio de fotos e vídeos.</p>
          <Link className="mt-6 inline-flex rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700" href="/registros/novo">+ Novo registro</Link>
        </section>
      </div>
    </main>
  );
}