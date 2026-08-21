"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";

function credentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = credentials(formData);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect("/login?erro=credenciais-invalidas");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = credentials(formData);
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) redirect("/cadastro?erro=nao-foi-possivel-criar");
  redirect("/login?cadastro=sucesso");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}