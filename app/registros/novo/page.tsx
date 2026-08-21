import Link from "next/link";
import { createRecord } from "@/features/records/actions";

export const dynamic = "force-dynamic";

export default function NovoRegistroPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link className="text-sm text-zinc-500 hover:text-zinc-900" href="/dashboard">← Voltar ao dashboard</Link>
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">EVOLUI</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">Novo registro</h1>
          <p className="mt-2 text-sm text-zinc-500">Registre uma atividade ou marco da sua evolução.</p>

          <form action={createRecord} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="type">Tipo de registro</label>
              <select className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-900" id="type" name="type" required defaultValue="">
                <option disabled value="">Selecione uma categoria</option>
                <option value="evolucao_fisica">Evolução física</option>
                <option value="musculacao">Musculação</option>
                <option value="natacao">Natação</option>
                <option value="corrida">Corrida</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="activityName">Atividade</label>
              <input className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:border-zinc-900" id="activityName" name="activityName" placeholder="Ex.: Corrida de 5 km" type="text" maxLength={120} />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="recordDate">Data</label>
              <input className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-900" id="recordDate" name="recordDate" type="date" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="notes">Observações</label>
              <textarea className="mt-2 min-h-32 w-full resize-y rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:border-zinc-900" id="notes" name="notes" placeholder="Como foi essa experiência?" maxLength={2000} />
            </div>

            <button className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-700" type="submit">Salvar registro</button>
          </form>
        </div>
      </div>
    </main>
  );
}