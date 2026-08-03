"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/form/submit-button";
import { ImageUploadField } from "@/components/form/image-upload-field";
import { initialFormState, type FormState } from "@/lib/actions/types";
import type { EventRow } from "@/lib/data/events";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron";

function toLocalInputValue(date?: Date) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({
  action,
  event,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  event?: EventRow;
}) {
  const [state, formAction] = useActionState(action, initialFormState);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state.status === "error" && (
        <p className="text-sm text-red-700 bg-red-50 rounded-lg px-4 py-3">{state.message}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Title (English)</label>
          <input name="titleEn" required defaultValue={event?.titleEn} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Title (Hindi)</label>
          <input name="titleHi" required defaultValue={event?.titleHi} className={inputClass} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Description (English)
          </label>
          <textarea
            name="descriptionEn"
            required
            rows={4}
            defaultValue={event?.descriptionEn}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Description (Hindi)
          </label>
          <textarea
            name="descriptionHi"
            required
            rows={4}
            defaultValue={event?.descriptionHi}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Date &amp; time</label>
          <input
            type="datetime-local"
            name="eventDate"
            required
            defaultValue={toLocalInputValue(event?.eventDate)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Location</label>
          <input name="location" required defaultValue={event?.location} className={inputClass} />
        </div>
      </div>
      <ImageUploadField currentImage={event?.coverImage} />
      <SubmitButton>{event ? "Save Changes" : "Create Event"}</SubmitButton>
    </form>
  );
}
