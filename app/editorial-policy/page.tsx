export default function EditorialPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold mb-6">
        Editorial Policy
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        PriceLot is committed to providing independent, accurate, transparent,
        and educational financial content. Every article, lesson, broker review,
        glossary definition, and trading guide is created with the objective of
        helping traders make informed decisions.
      </p>

      <div className="space-y-10">

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Independence
          </h2>

          <p className="text-gray-700">
            Our editorial decisions are never influenced by advertisers,
            brokers, affiliates, or commercial partnerships. Every review,
            comparison, and educational article is produced independently.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Accuracy
          </h2>

          <p className="text-gray-700">
            We continuously verify our information and update educational
            content whenever market regulations, trading platforms, or financial
            products change.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Transparency
          </h2>

          <p className="text-gray-700">
            Whenever affiliate relationships exist, they will always be clearly
            disclosed. Editorial opinions remain completely independent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Educational Purpose
          </h2>

          <p className="text-gray-700">
            PriceLot provides educational information only. Nothing published on
            this website should be interpreted as financial, investment, or
            trading advice.
          </p>
        </section>

      </div>

    </main>
  );
}