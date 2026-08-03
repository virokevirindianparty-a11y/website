"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitVolunteer } from "@/lib/actions/volunteer";
import { initialFormState } from "@/lib/actions/types";
import { SubmitButton } from "@/components/form/submit-button";
import { FormNotice } from "@/components/form/form-notice";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron";

const HELP_OPTION_KEYS = [
  "doorToDoor",
  "phoneOutreach",
  "eventHosting",
  "eventAttendance",
  "other",
] as const;

export function VolunteerForm() {
  const t = useTranslations("volunteer");
  const [state, formAction] = useActionState(submitVolunteer, initialFormState);

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
            {t("constituencyLabel")}
          </label>
          <input name="constituency" maxLength={255} className={inputClass} />
        </div>
      </div>
      <div>
        <p className="block text-sm font-semibold text-navy mb-2">{t("helpTitle")}</p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {HELP_OPTION_KEYS.map((key) => (
            <label
              key={key}
              className="flex items-center gap-2.5 text-sm text-muted border border-border rounded-lg px-3.5 py-2.5"
            >
              <input type="checkbox" name="helpTypes" value={key} className="rounded border-border" />
              {t(`helpOptions.${key}`)}
            </label>
          ))}
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
