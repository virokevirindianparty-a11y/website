"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContact } from "@/lib/actions/contact";
import { initialFormState } from "@/lib/actions/types";
import { SubmitButton } from "@/components/form/submit-button";
import { FormNotice } from "@/components/form/form-notice";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron";

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction] = useActionState(submitContact, initialFormState);

  return (
    <form action={formAction} className="space-y-5">
      <FormNotice status={state.status} successMessage={t("success")} errorMessage={t("error")} />
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          {t("nameLabel")}
        </label>
        <input name="name" required maxLength={255} className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {t("emailLabel")}
          </label>
          <input type="email" name="email" required maxLength={255} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {t("phoneLabel")}
          </label>
          <input type="tel" name="phone" maxLength={32} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          {t("messageLabel")}
        </label>
        <textarea name="message" required rows={5} maxLength={4000} className={inputClass} />
      </div>
      <SubmitButton>{t("submit")}</SubmitButton>
    </form>
  );
}
