import { cn } from '@/utils';

const VARIANTS = {
  new: 'bg-charcoal text-ivory',
  sale: 'bg-maroon text-ivory',
  rental: 'bg-gold text-charcoal',
  featured: 'bg-ivory text-charcoal border border-charcoal/20',
};

export default function Badge({
  children,
  variant = 'new',
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 text-[10px] tracking-widest2 uppercase font-medium',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
