import Link from 'next/link';

export default function GroupsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-space-100 mb-4">Study groups</h1>
      <p className="text-space-500 text-sm mb-4">
        Create a study group or ask for an invite in a channel.
      </p>
      <Link
        href="/groups/new"
        className="inline-block rounded-lg bg-accent-cyan px-4 py-2 font-semibold text-space-900 hover:opacity-90"
      >
        Create group
      </Link>
    </div>
  );
}
