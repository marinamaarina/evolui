import { z } from "zod";

/**
 * Variáveis de ambiente do EVOLUI.
 *
 * Ficam todas "opcionais" aqui de propósito: nesta fase do projeto ainda não
 * existe um projeto Supabase real conectado, e não queremos que `next build`
 * quebre por falta de credenciais. Cada serviço que efetivamente PRECISA de
 * uma credencial (ex.: services/supabase) valida na hora do uso e falha com
 * uma mensagem clara, em vez de deixar o app inteiro fora do ar por causa de
 * um valor ausente em uma página que nem usa Supabase.
 */
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  TURSO_DATABASE_URL: z.string().min(1).optional(),
  TURSO_AUTH_TOKEN: z.string().min(1).optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
});

/** true assim que as credenciais do Supabase estiverem configuradas. */
export const isSupabaseConfigured = Boolean(
  env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
