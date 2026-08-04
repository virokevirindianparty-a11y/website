import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { joinMemberSubmissions } from "@/db/schema";

const schema = z.object({
  name: z.string().trim().min(1).max(255),
  phone: z.string().trim().min(1).max(32),
  constituency: z.string().trim().min(1).max(255),
  motivation: z.string().trim().max(4000).optional().or(z.literal("")),
  wantsToVolunteer: z.union([z.literal("on"), z.null()]).optional(),
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    constituency: formData.get("constituency"),
    motivation: formData.get("motivation"),
    wantsToVolunteer: formData.get("wantsToVolunteer"),
  });

  if (!parsed.success) {
    return NextResponse.json({ status: "error", message: "invalid" });
  }

  try {
    await getDb().insert(joinMemberSubmissions).values({
      name: parsed.data.name,
      phone: parsed.data.phone,
      constituency: parsed.data.constituency,
      motivation: parsed.data.motivation || "",
      wantsToVolunteer: parsed.data.wantsToVolunteer === "on",
    });
    return NextResponse.json({ status: "success" });
  } catch {
    return NextResponse.json({ status: "error", message: "server" });
  }
}
