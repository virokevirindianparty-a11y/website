"use server";

import { z } from "zod";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { initialFormState, type FormState } from "./types";

const schema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
});

export async function submitContact(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  try {
    await getDb().insert(contactSubmissions).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: "server" };
  }
}

export const contactInitialState = initialFormState;
