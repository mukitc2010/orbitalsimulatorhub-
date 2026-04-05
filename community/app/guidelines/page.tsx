import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-app">
      <PublicNav />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold text-app">Community guidelines</h1>
        <p className="mt-4 text-muted">
          Be respectful, stay on topic, and help others learn. No spam or harassment.
        </p>
        <Link href="/welcome" className="mt-6 inline-block text-primary hover:underline">← Back to welcome</Link>
      </main>
    </div>
  );
}
