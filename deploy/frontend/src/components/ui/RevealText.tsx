'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const parentVariants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

const childVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.62, ease: EASE } },
};

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export function RevealText({
  text,
  as: Tag = 'h2',
  className,
  mode = 'words',
  delay = 0,
  replayKey,
}: {
  text: string;
  as?: Tag;
  className?: string;
  mode?: 'words' | 'letters';
  delay?: number;
  replayKey?: string | number;
}) {
  const reduce = useReducedMotion();
  const parts = mode === 'letters' ? Array.from(text) : text.split(/(\s+)/);

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        key={replayKey}
        aria-hidden
        className="inline"
        custom={delay}
        variants={parentVariants}
        initial="hidden"
        {...(replayKey !== undefined
          ? { animate: 'show' }
          : { whileInView: 'show' })}
        viewport={{ once: true, amount: 0.2 }}
      >
        {parts.map((part, i) => {
          if (mode === 'words' && /^\s+$/.test(part)) {
            return <span key={`${replayKey ?? 't'}-${i}`}>{part}</span>;
          }
          return (
            <span
              key={`${replayKey ?? 't'}-${i}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span className="inline-block" variants={childVariants}>
                {part === ' ' ? '\u00A0' : part}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

export function RevealIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
