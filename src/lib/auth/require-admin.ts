import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionCookie, type AdminSession } from "./session";

/**
 * Re-checks the session inside the server action / route handler itself.
 * Middleware alone doesn't guard Server Actions invoked from a page it
 * didn't gate (Next.js 16 auth guide), so every admin mutation calls this.
 */
export async function requireAdminSession(): Promise<AdminSession> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionCookie(token) : null;
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? verifySessionCookie(token) : null;
}
