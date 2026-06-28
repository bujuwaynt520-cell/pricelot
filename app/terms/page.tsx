export default function TermsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold mb-6">
        Terms of Service
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        By accessing and using PriceLot, you agree to comply with these Terms
        of Service. These terms govern your use of our educational platform,
        tools, and resources.
      </p>

      <div className="space-y-10">

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Educational Purpose
          </h2>

          <p className="text-gray-700">
            PriceLot provides educational information only. Nothing on this
            website constitutes financial, investment, legal, or tax advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            User Responsibilities
          </h2>

          <p className="text-gray-700">
            Users are responsible for ensuring that any financial decisions they
            make are based on their own research and consultation with qualified
            professionals where appropriate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Intellectual Property
          </h2>

          <p className="text-gray-700">
            All PriceLot content, including articles, lessons, graphics,
            branding, software, and educational materials, is protected by
            intellectual property laws and may not be reproduced without
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Limitation of Liability
          </h2>

          <p className="text-gray-700">
            PriceLot shall not be liable for losses or damages arising from the
            use of information provided on this platform or reliance upon any
            educational content.
          </p>
        </section>

      </div>

    </main>
  );
}