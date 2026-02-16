import { Link } from "wouter";

export function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="headline text-4xl mb-4">404</h1>
      <p className="subhead mb-6">Page not found.</p>
      <Link href="/" className="text-[var(--accent-cyan)] font-medium hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
