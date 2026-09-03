import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-wide py-20 sm:py-32 text-center px-4">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-4xl mt-3 mb-4">Page Not Found</h1>
      <p className="text-charcoal/70 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
