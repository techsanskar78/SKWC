import { cn } from '@/utils';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export function RevealText({
  text,
  as: Tag = 'h2',
  className,
}: {
  text: string;
  as?: Tag;
  className?: string;
  mode?: 'words' | 'letters';
  delay?: number;
  replayKey?: string | number;
}) {
  return <Tag className={cn('reveal-up', className)}>{text}</Tag>;
}

export function RevealIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={cn('reveal-up', className)}>{children}</div>;
}
