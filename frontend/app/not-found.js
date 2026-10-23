import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-ink-soft">This page does not exist.</p>
      <Link href="/" className="rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 font-semibold">
        Back to home
      </Link>
    </main>
  );
}
