const FALLBACK_IMAGE = '/images/lehenga-maroon.jpg';

export function extractDriveFileId(input: string): string | null {
  if (!input) return null;
  const value = input.trim();

  const fileMatch = value.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  const idMatch = value.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  const dMatch = value.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch) return dMatch[1];

  if (/^[a-zA-Z0-9_-]{25,}$/.test(value) && !value.includes('/')) return value;

  return null;
}

export function driveImageUrl(fileId: string) {
  return `https://lh3.googleusercontent.com/d/${fileId}=w1600`;
}

export function isDriveImage(src?: string) {
  if (!src) return false;
  return src.includes('drive.google.com') || src.includes('googleusercontent.com');
}

export function toDisplayImageUrl(src?: string | null): string {
  if (!src || !src.trim()) return FALLBACK_IMAGE;

  const value = src.trim();
  const fileId = extractDriveFileId(value);

  if (fileId && (isDriveImage(value) || !value.includes('://'))) {
    return driveImageUrl(fileId);
  }

  return value;
}
