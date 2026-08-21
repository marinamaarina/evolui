# EVOLUI

Registre e acompanhe sua evolução física e esportiva ao longo do tempo.

Este repositório está na **Etapa 1** do roadmap (setup do projeto). Veja o
documento completo de arquitetura em `docs/Arquitetura EVOLUI.md`.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS · Supabase (Postgres + Auth
+ Storage) · Prisma.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000 — a página inicial mostra o status do setup
(o que já está pronto e o que ainda falta configurar).

## Configurando o Supabase (necessário a partir da etapa 2)

1. Crie uma conta e um projeto em https://supabase.com.
2. Em **Project Settings → API**, copie a **Project URL** e a **anon public
   key**.
3. Em **Project Settings → Database**, copie a **connection string**
   (versão "Transaction pooler" para `DATABASE_URL`, e "Session"/direta para
   `DIRECT_URL`).
4. Copie `.env.example` para `.env.local` e preencha os quatro valores:

   ```bash
   cp .env.example .env.local
   ```

5. Depois que os models existirem (etapa 3), gere o client do Prisma e
   aplique as migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

> **Nota:** o ambiente onde este projeto foi montado (sandbox de
> desenvolvimento) não tem acesso de rede aos binários do Prisma
> (`binaries.prisma.sh`), então `prisma generate`/`migrate` não puderam ser
> testados por aqui. Isso não deve acontecer na sua máquina, na Vercel ou em
> CI normais — só rode esses comandos no seu ambiente.

## Estrutura de pastas

```
app/          rotas (App Router)
components/   componentes de UI reutilizáveis (ui/, layout/)
features/     lógica de cada domínio (auth, records, media, timeline, comparison, analysis)
services/     integrações externas (supabase, storage, analysis)
lib/          utilitários, validação (zod), acesso a dados
prisma/       schema e migrations
types/        tipos compartilhados
docs/         documento de arquitetura do projeto
```

## Estado atual

- [x] Projeto Next.js + Tailwind + TypeScript
- [x] Estrutura de pastas da arquitetura
- [x] Prisma configurado (sem models ainda — etapa 3)
- [x] Clients Supabase (browser/server) prontos, aguardando credenciais
- [ ] Autenticação (etapa 2)
- [ ] Modelo de dados + migrations (etapa 3)
- [ ] Fluxo de "Novo Registro" (etapa 4)
