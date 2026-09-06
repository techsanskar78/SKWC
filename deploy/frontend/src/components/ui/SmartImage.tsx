import Image, { ImageProps } from 'next/image';
import { isDriveImage, toDisplayImageUrl } from 'skwc-backend/drive';

type SmartImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
};

export default function SmartImage({ src, alt, quality, priority, loading, ...props }: SmartImageProps) {
  const url = toDisplayImageUrl(src);
  const isPriority = Boolean(priority);
  return (
    <Image
      src={url}
      alt={alt}
      quality={quality ?? (isPriority ? 60 : 52)}
      priority={isPriority}
      loading={isPriority ? undefined : loading ?? 'lazy'}
      unoptimized={isDriveImage(url)}
      {...props}
    />
  );
}
