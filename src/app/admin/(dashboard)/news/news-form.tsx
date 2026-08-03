"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/form/submit-button";
import { ImageUploadField } from "@/components/form/image-upload-field";
import { initialFormState, type FormState } from "@/lib/actions/types";
import type { NewsPost } from "@/lib/data/news";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron";

export function NewsForm({
  action,
  post,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  post?: NewsPost;
}) {
  const [state, formAction] = useActionState(action, initialFormState);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state.status === "error" && (
        <p className="text-sm text-red-700 bg-red-50 rounded-lg px-4 py-3">{state.message}</p>
      )}
      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">
          Slug (URL, e.g. society-meeting-report)
        </label>
        <input
          name="slug"
          required
          defaultValue={post?.slug}
          className={inputClass}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Title (English)</label>
          <input name="titleEn" required defaultValue={post?.titleEn} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Title (Hindi)</label>
          <input name="titleHi" required defaultValue={post?.titleHi} className={inputClass} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Body (English)</label>
          <textarea name="bodyEn" required rows={6} defaultValue={post?.bodyEn} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Body (Hindi)</label>
          <textarea name="bodyHi" required rows={6} defaultValue={post?.bodyHi} className={inputClass} />
        </div>
      </div>
      <ImageUploadField currentImage={post?.coverImage} />
      <label className="flex items-center gap-2.5 text-sm text-muted">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className="rounded border-border"
        />
        Published (visible on the public site)
      </label>
      <SubmitButton>{post ? "Save Changes" : "Create Post"}</SubmitButton>
    </form>
  );
}
