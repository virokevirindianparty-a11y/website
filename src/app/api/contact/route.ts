import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";

const schema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
});

// Plain fetch() POST, not a Server Action <form action>: Netlify's Next.js
// Runtime crashes handling Server Action form submissions on this deployment
// (see /api/admin/upload for the fuller explanation). Route Handlers use the
// standard Fetch Request object and don't hit that code path.
export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return NextResponse.json({ status: "error", message: "invalid" });
  }

  try {
    await getDb().insert(contactSubmissions).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    return NextResponse.json({ status: "success" });
  } catch {
    return NextResponse.json({ status: "error", message: "server" });
  }
}
