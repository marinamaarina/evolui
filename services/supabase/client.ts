"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * Client Supabase para uso no browser (Client Components).
 *
 * Lança um erro só quando efetivamente chamado sem credenciais configuradas
 * — assim uma página que não usa Supabase continua funcionando normalmente
 * mesmo antes do projeto Supabase existir.
 */
export function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local (veja .env.example)."
    );
  }

  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
