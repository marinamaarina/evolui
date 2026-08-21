import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * Client Supabase para uso no servidor (Server Components e Server Actions).
 * Lê/escreve a sessão via cookies do Next.js, seguindo o padrão do
 * pacote @supabase/ssr.
 *
 * Assim como o client do browser, só falha quando é efetivamente chamado
 * sem credenciais configuradas.
 */
export async function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local (veja .env.example)."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // `setAll` chamado a partir de um Server Component: ignorável
            // quando existe um middleware renovando a sessão (etapa 2).
          }
        },
      },
    }
  );
}
