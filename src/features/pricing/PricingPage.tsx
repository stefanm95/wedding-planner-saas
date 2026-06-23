import { Link } from "react-router-dom";
import { packagePlans } from "../../data/catalog";
import { FinalCtaSection } from "../marketing/MarketingPages";

export function PricingPage() {
  return (
    <section className="section py-14">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">Pricing</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Packages prepared for every event size.</h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          Payments are intentionally mocked in this milestone. Package structure is ready for Stripe later.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {packagePlans.map((plan) => (
          <article key={plan.id} className={`rounded-[2rem] border p-6 ${plan.highlighted ? "border-ink bg-ink text-white" : "border-white bg-white"}`}>
            <p className={plan.highlighted ? "text-sm text-champagne" : "text-sm text-cocoa"}>{plan.priceLabel}</p>
            <h2 className="mt-3 text-2xl font-bold">{plan.name}</h2>
            <p className={`mt-3 text-sm leading-6 ${plan.highlighted ? "text-white/75" : "text-stone-600"}`}>{plan.description}</p>
            <ul className="mt-6 grid gap-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span>+</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/create" className={plan.highlighted ? "btn-secondary mt-6 w-full" : "btn-primary mt-6 w-full"}>
              Start with {plan.name}
            </Link>
          </article>
        ))}
      </div>
      <FinalCtaSection />
    </section>
  );
}
