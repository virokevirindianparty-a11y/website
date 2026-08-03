"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitDonateInterest } from "@/lib/actions/donate";
import { initialFormState } from "@/lib/actions/types";
import { SubmitButton } from "@/components/form/submit-button";
import { FormNotice } from "@/components/form/form-notice";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron";

export function DonateForm() {
  const t = useTranslations("donate");
  const [state, formAction] = useActionState(submitDonateInterest, initialFormState);

  return (
    <form action={formAction} className="space-y-5">
      <FormNotice status={state.status} successMessage={t("success")} errorMessage={t("error")} />
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {t("nameLabel")}
          </label>
          <input name="name" required maxLength={255} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {t("phoneLabel")}
          </label>
          <input type="tel" name="phone" required maxLength={32} className={inputClass} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {t("emailLabel")}
          </label>
          <input type="email" name="email" maxLength={255} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {t("amountLabel")}
          </label>
          <input name="amountRange" maxLength={64} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          {t("messageLabel")}
        </label>
        <textarea name="message" rows={3} maxLength={4000} className={inputClass} />
      </div>
      <SubmitButton>{t("submit")}</SubmitButton>
    </form>
  );
}
