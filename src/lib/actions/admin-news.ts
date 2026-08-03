"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { newsPosts } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { uploadImage, MediaUploadError } from "@/lib/storage/upload-image";
import type { FormState } from "./types";

const schema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  titleEn: z.string().trim().min(1),
  titleHi: z.string().trim().min(1),
  bodyEn: z.string().trim().min(1),
  bodyHi: z.string().trim().min(1),
  published: z.union([z.literal("on"), z.null()]).optional(),
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

export async function createNews(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const cover = await resolveCoverImage(formData);
  if (!cover.ok) {
    return { status: "error", message: cover.message };
  }

  try {
    await getDb().insert(newsPosts).values({
      slug: parsed.data.slug,
      titleEn: parsed.data.titleEn,
      titleHi: parsed.data.titleHi,
      bodyEn: parsed.data.bodyEn,
      bodyHi: parsed.data.bodyHi,
      coverImage: cover.coverImage,
      published: parsed.data.published === "on",
    });
  } catch {
    return { status: "error", message: "That slug is already in use." };
  }

  revalidatePath("/admin/news");
  revalidatePath("/[locale]/news", "page");
  redirect("/admin/news");
}

export async function updateNews(
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

  try {
    await getDb()
      .update(newsPosts)
      .set({
        slug: parsed.data.slug,
        titleEn: parsed.data.titleEn,
        titleHi: parsed.data.titleHi,
        bodyEn: parsed.data.bodyEn,
        bodyHi: parsed.data.bodyHi,
        coverImage: cover.coverImage,
        published: parsed.data.published === "on",
        updatedAt: new Date(),
      })
      .where(eq(newsPosts.id, id));
  } catch {
    return { status: "error", message: "That slug is already in use." };
  }

  revalidatePath("/admin/news");
  revalidatePath("/[locale]/news", "page");
  redirect("/admin/news");
}

export async function deleteNews(id: number) {
  await requireAdminSession();
  await getDb().delete(newsPosts).where(eq(newsPosts.id, id));
  revalidatePath("/admin/news");
  revalidatePath("/[locale]/news", "page");
}
