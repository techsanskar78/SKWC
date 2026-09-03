declare module 'next/cache' {
  export function unstable_cache<T extends (...args: unknown[]) => unknown>(
    fn: T,
    keyParts?: string[],
    options?: { revalidate?: number | false; tags?: string[] }
  ): T;
}
