import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { volunteerSubmissions } from "@/db/schema";

const schema = z.object({
  name: z.string().trim().min(1).max(255),
  phone: z.string().trim().min(1).max(32),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  constituency: z.string().trim().max(255).optional().or(z.literal("")),
  helpTypes: z.array(z.string()).min(1),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    constituency: formData.get("constituency"),
    helpTypes: formData.getAll("helpTypes"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return NextResponse.json({ status: "error", message: "invalid" });
  }

  try {
    await getDb().insert(volunteerSubmissions).values({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      constituency: parsed.data.constituency || null,
      helpTypes: parsed.data.helpTypes,
      message: parsed.data.message || null,
    });
    return NextResponse.json({ status: "success" });
  } catch {
    return NextResponse.json({ status: "error", message: "server" });
  }
}
