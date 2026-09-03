import SmartImage from '@/components/ui/SmartImage';

export default function PageHero({
  src,
  eyebrow,
  title,
  subtitle,
}: {
  src: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative h-[52svh] min-h-[360px] sm:h-[58svh] sm:min-h-[420px] lg:h-[64svh] overflow-hidden">
      <SmartImage src={src} alt={title} fill priority sizes="100vw" quality={65} className="object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/20" />
      <div className="relative h-full container-wide flex flex-col justify-end pb-10 sm:pb-14 text-ivory">
        <p className="eyebrow text-champagne">{eyebrow}</p>
        <h1 className="font-serif text-[2rem] leading-tight sm:text-5xl lg:text-6xl max-w-3xl mt-3">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-ivory/85 text-sm sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
