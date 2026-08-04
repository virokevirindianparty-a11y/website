"use client";

import { useTranslations } from "next-intl";
import { usePostForm } from "@/lib/hooks/use-post-form";
import { PendingButton } from "@/components/form/pending-button";
import { FormNotice } from "@/components/form/form-notice";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron";

export function JoinForm() {
  const t = useTranslations("join");
  const { state, pending, handleSubmit } = usePostForm("/api/join");

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
            {t("phoneLabel")}
          </label>
          <input type="tel" name="phone" required maxLength={32} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            {t("constituencyLabel")}
          </label>
          <input name="constituency" required maxLength={255} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          {t("motivationLabel")}
        </label>
        <textarea name="motivation" rows={4} maxLength={4000} className={inputClass} />
      </div>
      <label className="flex items-center gap-2.5 text-sm text-muted">
        <input type="checkbox" name="wantsToVolunteer" className="rounded border-border" />
        {t("volunteerLabel")}
      </label>
      <PendingButton pending={pending}>{t("submit")}</PendingButton>
    </form>
  );
}
