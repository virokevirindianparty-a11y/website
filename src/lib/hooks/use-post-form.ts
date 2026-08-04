"use client";

import { useState } from "react";
import { initialFormState, type FormState } from "@/lib/actions/types";

/**
 * Submits a form via a plain fetch() POST instead of a Server Action.
 * Netlify's Next.js Runtime crashes handling Server Action form
 * submissions on this deployment; Route Handlers hit via fetch() don't.
 */
export function usePostForm(endpoint: string) {
  const [state, setState] = useState<FormState>(initialFormState);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setPending(true);
    setState(initialFormState);

    try {
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const body = (await res.json()) as FormState;
      setState(body);
      if (body.status === "success") {
        form.reset();
      }
    } catch {
      setState({ status: "error", message: "server" });
    } finally {
      setPending(false);
    }
  }

  return { state, pending, handleSubmit };
}
