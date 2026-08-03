export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy text-white">
      <div className="container-page py-14 md:py-20">
        {eyebrow && (
          <p className="text-saffron font-semibold text-xs tracking-widest uppercase mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
