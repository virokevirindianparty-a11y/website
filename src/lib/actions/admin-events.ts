"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { events } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { uploadImage, MediaUploadError } from "@/lib/storage/upload-image";
import type { FormState } from "./types";

const schema = z.object({
  titleEn: z.string().trim().min(1),
  titleHi: z.string().trim().min(1),
  descriptionEn: z.string().trim().min(1),
  descriptionHi: z.string().trim().min(1),
  eventDate: z.string().trim().min(1),
  location: z.string().trim().min(1).max(255),
});

async function resolveCoverImage(formData: FormData): Promise<
  { ok: true; coverImage: string | null } | { ok: false; message: string }
> {
  const file = formData.get("coverImageFile");
  const existing = (formData.get("existingCoverImage") as string) || null;

  if (file instanceof File && file.size > 0) {
    try {
      return { ok: true, coverImage: await uploadImage(file) };
    } catch (err) {
      return {
        ok: false,
        message: err instanceof MediaUploadError ? err.message : "Image upload failed.",
      };
    }
  }

  return { ok: true, coverImage: existing };
}

export async function createEvent(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const cover = await resolveCoverImage(formData);
  if (!cover.ok) {
    return { status: "error", message: cover.message };
  }

  await getDb().insert(events).values({
    titleEn: parsed.data.titleEn,
    titleHi: parsed.data.titleHi,
    descriptionEn: parsed.data.descriptionEn,
    descriptionHi: parsed.data.descriptionHi,
    eventDate: new Date(parsed.data.eventDate),
    location: parsed.data.location,
    coverImage: cover.coverImage,
  });

  revalidatePath("/admin/events");
  revalidatePath("/[locale]/events", "page");
  redirect("/admin/events");
}

export async function updateEvent(
  id: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdminSession();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const cover = await resolveCoverImage(formData);
  if (!cover.ok) {
    return { status: "error", message: cover.message };
  }

  await getDb()
    .update(events)
    .set({
      titleEn: parsed.data.titleEn,
      titleHi: parsed.data.titleHi,
      descriptionEn: parsed.data.descriptionEn,
      descriptionHi: parsed.data.descriptionHi,
      eventDate: new Date(parsed.data.eventDate),
      location: parsed.data.location,
      coverImage: cover.coverImage,
    })
    .where(eq(events.id, id));

  revalidatePath("/admin/events");
  revalidatePath("/[locale]/events", "page");
  redirect("/admin/events");
}

export async function deleteEvent(id: number) {
  await requireAdminSession();
  await getDb().delete(events).where(eq(events.id, id));
  revalidatePath("/admin/events");
  revalidatePath("/[locale]/events", "page");
}
