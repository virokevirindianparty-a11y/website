"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  label,
}: {
  action: () => Promise<void>;
  label: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`${label}? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="p-2 rounded-lg border border-border hover:border-red-400 text-red-600"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
