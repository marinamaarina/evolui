import { isSupabaseConfigured } from "@/lib/env";

type CheckStatus = "ok" | "pending";

function Check({ status, label }: { status: CheckStatus; label: string }) {
  const isOk = status === "ok";
  return (
    <li className="flex items-start gap-3 py-3">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isOk
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
        aria-hidden
      >
        {isOk ? "✓" : "…"}
      </span>
      <span className="text-sm leading-6 text-zinc-700">{label}</span>
    </li>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          Etapa 1 · Setup do projeto
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
          EVOLUI
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Veja sua evolução. Entenda seu progresso.
        </p>

        <ul className="mt-6 divide-y divide-zinc-100 border-t border-zinc-100">
          <Check status="ok" label="Next.js + TypeScript + Tailwind configurados" />
          <Check status="ok" label="Estrutura de pastas do projeto criada" />
          <Check status="ok" label="Prisma inicializado (schema pronto para os models da etapa 3)" />
          <Check
            status={isSupabaseConfigured ? "ok" : "pending"}
            label={
              isSupabaseConfigured
                ? "Supabase conectado"
                : "Supabase: configure as chaves em .env.local (veja .env.example)"
            }
          />
        </ul>

        <p className="mt-6 text-xs text-zinc-400">
          Esta página é temporária — a landing page real entra na etapa 10.
        </p>
      </div>
    </main>
  );
}
