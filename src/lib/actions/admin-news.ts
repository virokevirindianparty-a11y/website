"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { newsPosts } from "@/db/schema";
import { requireAdminSession } from "@/lib/auth/require-admin";
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
  coverImage: z.string().trim().max(1000).optional().or(z.literal("")),
  published: z.union([z.literal("on"), z.null()]).optional(),
});

export async function createNews(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdminSession();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await getDb().insert(newsPosts).values({
      slug: parsed.data.slug,
      titleEn: parsed.data.titleEn,
      titleHi: parsed.data.titleHi,
      bodyEn: parsed.data.bodyEn,
      bodyHi: parsed.data.bodyHi,
      coverImage: parsed.data.coverImage || null,
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

  try {
    await getDb()
      .update(newsPosts)
      .set({
        slug: parsed.data.slug,
        titleEn: parsed.data.titleEn,
        titleHi: parsed.data.titleHi,
        bodyEn: parsed.data.bodyEn,
        bodyHi: parsed.data.bodyHi,
        coverImage: parsed.data.coverImage || null,
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
