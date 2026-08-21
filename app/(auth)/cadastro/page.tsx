import Link from "next/link";
import { signup } from "@/features/auth/actions";

export default async function CadastroPage({ searchParams }: PageProps<"/cadastro">) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16">
      <form action={signup} className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">EVOLUI</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">Criar sua conta</h1>
        <p className="mt-2 text-sm text-zinc-500">Comece a registrar seu progresso.</p>
        {params.erro === "nao-foi-possivel-criar" && <p className="mt-6 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-800">Não foi possível criar a conta. O e-mail pode já estar cadastrado ou a senha não atende aos requisitos.</p>}

        <label className="mt-8 block text-sm font-medium text-zinc-700" htmlFor="email">E-mail</label>
        <input className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-900" id="email" name="email" type="email" required />

        <label className="mt-4 block text-sm font-medium text-zinc-700" htmlFor="password">Senha</label>
        <input className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-900" id="password" name="password" type="password" minLength={6} required />

        <button className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700" type="submit">Criar conta</button>
        <p className="mt-6 text-center text-sm text-zinc-500">Já tem conta? <Link className="font-medium text-zinc-900 underline" href="/login">Entrar</Link></p>
      </form>
    </main>
  );
}