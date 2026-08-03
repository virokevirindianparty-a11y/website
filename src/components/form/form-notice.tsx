import { CheckCircle2, AlertCircle } from "lucide-react";

export function FormNotice({
  status,
  successMessage,
  errorMessage,
}: {
  status: "idle" | "success" | "error";
  successMessage: string;
  errorMessage: string;
}) {
  if (status === "idle") return null;

  if (status === "success") {
    return (
      <div className="flex items-start gap-2 rounded-lg bg-green/10 text-green-dark px-4 py-3 text-sm">
        <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <p>{errorMessage}</p>
    </div>
  );
}
