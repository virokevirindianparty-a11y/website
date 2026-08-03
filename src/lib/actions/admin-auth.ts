"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import { signSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session";
import type { FormState } from "./types";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function loginAdmin(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email and password." };
  }

  const rows = await getDb()
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, parsed.data.email))
    .limit(1);
  const user = rows[0];

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { status: "error", message: "Invalid email or password." };
  }

  const token = await signSession({ sub: String(user.id), email: user.email, name: user.name });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
