export function PendingButton({
  pending,
  children,
}: {
  pending: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full md:w-auto bg-saffron text-white font-heading font-semibold px-8 py-3 rounded-full shadow-sm hover:bg-saffron-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "..." : children}
    </button>
  );
}
