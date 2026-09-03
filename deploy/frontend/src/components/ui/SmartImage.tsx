import Image, { ImageProps } from 'next/image';
import { isDriveImage, toDisplayImageUrl } from 'skwc-backend/drive';

type SmartImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
};

export default function SmartImage({ src, alt, quality = 70, ...props }: SmartImageProps) {
  const url = toDisplayImageUrl(src);
  return <Image src={url} alt={alt} quality={quality} unoptimized={isDriveImage(url)} {...props} />;
}
