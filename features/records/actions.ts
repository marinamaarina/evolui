"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";

const recordTypes = new Set([
  "evolucao_fisica",
  "musculacao",
  "natacao",
  "corrida",
  "outro",
]);

export async function createRecord(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const type = String(formData.get("type") ?? "");
  const activityName = String(formData.get("activityName") ?? "").trim();
  const recordDate = String(formData.get("recordDate") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!recordTypes.has(type) || !/^\d{4}-\d{2}-\d{2}$/.test(recordDate)) {
    redirect("/registros/novo?erro=dados-invalidos");
  }

  const parsedDate = new Date(`${recordDate}T00:00:00.000Z`);
  if (Number.isNaN(parsedDate.getTime())) {
    redirect("/registros/novo?erro=data-invalida");
  }

  const { prisma } = await import("@/lib/db/prisma");
  await prisma.profile.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      name: user.user_metadata.full_name ?? user.email ?? null,
    },
  });

  await prisma.record.create({
    data: {
      userId: user.id,
      type,
      activityName: activityName || null,
      recordDate: parsedDate,
      notes: notes || null,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard?registro=criado");
}

export async function uploadMedia(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const recordId = String(formData.get("recordId") ?? "");
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0 || file.size > 200 * 1024 * 1024) {
    redirect(`/registros/${recordId}?erro=arquivo-invalido`);
  }

  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime"]);
  if (!allowedTypes.has(file.type)) redirect(`/registros/${recordId}?erro=formato-invalido`);

  const { prisma } = await import("@/lib/db/prisma");
  const record = await prisma.record.findFirst({ where: { id: recordId, userId: user.id } });
  if (!record) redirect("/evolucao");

  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const storagePath = `${user.id}/${recordId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("media").upload(storagePath, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) redirect(`/registros/${recordId}?erro=upload-falhou`);

  const mediaCount = await prisma.media.count({ where: { recordId } });
  await prisma.media.create({
    data: { recordId, type: file.type.startsWith("video/") ? "video" : "photo", storagePath, orderIndex: mediaCount },
  });
  revalidatePath(`/registros/${recordId}`);
  redirect(`/registros/${recordId}?media=adicionada`);
}