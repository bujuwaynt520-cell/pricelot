export default function PrivacyPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold mb-6">
        Privacy Policy
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Your privacy is important to us. This Privacy Policy explains how
        PriceLot collects, uses, stores, and protects your information while
        you use our website and services.
      </p>

      <div className="space-y-10">

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>

          <p className="text-gray-700">
            We may collect information you voluntarily provide, such as your
            email address when subscribing to newsletters or creating an
            account. We also collect anonymous analytics data to improve our
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            How We Use Information
          </h2>

          <p className="text-gray-700">
            Information is used to improve educational content, personalize your
            learning experience, provide customer support, and maintain website
            security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Cookies
          </h2>

          <p className="text-gray-700">
            PriceLot uses cookies to enhance your browsing experience, remember
            preferences, analyze website traffic, and improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Data Protection
          </h2>

          <p className="text-gray-700">
            We employ industry-standard security measures to safeguard your
            information against unauthorized access, disclosure, or misuse.
          </p>
        </section>

      </div>

    </main>
  );
}