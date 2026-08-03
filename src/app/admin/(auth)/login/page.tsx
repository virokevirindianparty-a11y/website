"use client";

import Image from "next/image";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { loginAdmin } from "@/lib/actions/admin-auth";
import { initialFormState } from "@/lib/actions/types";
import { SubmitButton } from "@/components/form/submit-button";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron";

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAdmin, initialFormState);

  return (
    <div className="w-full max-w-sm bg-surface rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center mb-6">
        <Image src="/images/logo.webp" alt="VVIP" width={48} height={48} />
        <h1 className="font-heading font-extrabold text-navy text-lg mt-3">VVIP Admin</h1>
      </div>

      <form action={formAction} className="space-y-4">
        {state.status === "error" && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{state.message}</p>
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
          <input type="email" name="email" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Password</label>
          <input type="password" name="password" required className={inputClass} />
        </div>
        <SubmitButton>Log In</SubmitButton>
      </form>
    </div>
  );
}
