"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";

function credentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function login(formData: FormData) {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    redirect("/login?erro=nao-configurado");
  }
  const { email, password } = credentials(formData);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect("/login?erro=credenciais-invalidas");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    redirect("/cadastro?erro=nao-foi-possivel-criar");
  }
  const { email, password } = credentials(formData);
  if (!email || !email.includes("@") || password.length < 6) {
    redirect("/cadastro?erro=dados-invalidos");
  }
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const reason = error.message.toLowerCase().includes("already registered")
      ? "email-existente"
      : error.message.toLowerCase().includes("password")
        ? "senha-invalida"
        : "nao-foi-possivel-criar";
    redirect(`/cadastro?erro=${reason}`);
  }
  if (data.user && data.user.identities?.length === 0) {
    redirect("/cadastro?erro=email-existente");
  }
  redirect("/login?cadastro=sucesso");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}