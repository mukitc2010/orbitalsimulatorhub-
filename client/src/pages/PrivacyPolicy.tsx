import { Link } from "wouter";

export function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="hero-gradient rounded-2xl px-6 py-10 text-center mb-8">
        <h1 className="headline mb-3 text-white">Privacy Policy</h1>
        <p className="text-white/95">
          OrbitalSimulatorHub — Last updated: February 2026
        </p>
      </section>

      <div className="rounded-xl border-2 border-[var(--accent-cyan)]/40 bg-white p-6 space-y-6 text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">1. Information We Collect</h2>
          <p>
            OrbitalSimulatorHub (orbitalsimulatorhub.com) is an educational space platform. We may collect:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Usage data (pages visited, features used) to improve the site</li>
            <li>Analytics via third-party services (e.g., Google Analytics) — anonymized</li>
            <li>Information you provide when contacting us or signing up for features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">2. How We Use Information</h2>
          <p>
            We use collected information to operate the site, improve content, and provide a better experience. We do not sell your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">3. Cookies & Tracking</h2>
          <p>
            We may use cookies and similar technologies for analytics and functionality. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">4. Third-Party Links</h2>
          <p>
            Our site may link to external sites (e.g., NASA, Amazon affiliate links). We are not responsible for their privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">5. Contact</h2>
          <p>
            For questions about this policy, contact us through the site or at the email provided in our footer.
          </p>
        </section>

        <p className="text-sm text-slate-500 pt-4">
          By using OrbitalSimulatorHub, you agree to this Privacy Policy.
        </p>
      </div>

      <p className="text-center mt-6">
        <Link href="/" className="text-[var(--accent-cyan)] hover:underline">← Back to Home</Link>
      </p>
    </div>
  );
}
