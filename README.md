# EVOLUI

Registre e acompanhe sua evolução física e esportiva ao longo do tempo.

Este repositório está na **Etapa 1** do roadmap (setup do projeto). Veja o
documento completo de arquitetura em `docs/Arquitetura EVOLUI.md`.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS · Turso (SQLite/libSQL) ·
Supabase Auth + Storage · Prisma.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000 — a página inicial mostra o status do setup
(o que já está pronto e o que ainda falta configurar).

## Configurando Turso e Supabase (necessário a partir da etapa 2)

1. Crie um banco em https://turso.tech e copie a URL e o token de autenticação.
2. Crie um projeto em https://supabase.com e copie a **Project URL** e a
   **anon public key** para o Auth e Storage.
3. Copie `.env.example` para `.env.local` e preencha os valores:

   ```bash
   cp .env.example .env.local
   ```

4. Depois que os models existirem (etapa 3), gere o client do Prisma:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

   Execute `npx prisma db push` com `TURSO_DATABASE_URL` e
   `TURSO_AUTH_TOKEN` configurados para criar as tabelas no banco Turso.

> O Turso não oferece o RLS do Supabase. Toda consulta e mutação do EVOLUI
> deverá filtrar pelo `user_id` autenticado no servidor.

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
- [x] Autenticação inicial (etapa 2)
- [x] Modelo de dados base para Turso (etapa 3)
- [ ] Fluxo de "Novo Registro" (etapa 4)
