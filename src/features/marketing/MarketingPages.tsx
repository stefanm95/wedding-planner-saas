import { Link } from "react-router-dom";
import { eventTypeOptions } from "../../data/catalog";

export function HomePage() {
  return (
    <>
      <section className="section grid min-h-[calc(100vh-5rem)] items-center gap-10 py-14 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">Digital invitations and light planning</p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">Create an invitation that feels like the event.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            Wedly helps hosts launch a public invitation page, collect RSVP responses, and manage event details from a calm private dashboard.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/app/events/new" className="btn-primary">Create invitation</Link>
            <Link to="/templates" className="btn-secondary">Browse templates</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-soft">
          <img
            className="h-[520px] w-full rounded-[2rem] object-cover"
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80"
            alt="Elegant event table setup"
          />
        </div>
      </section>
      <section className="section py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {["Instant public link", "Guest RSVP without accounts", "Private owner dashboard"].map((item) => (
            <div key={item} className="rounded-[2rem] bg-white p-6 shadow-soft">
              <h2 className="text-xl font-bold text-ink">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">Built as a focused MVP surface with mock services ready to swap for a real backend.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function HowItWorksPage() {
  const steps = ["Choose event type", "Select a package", "Pick a template", "Add details", "Share the invite", "Manage RSVPs"];

  return (
    <section className="section py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">How it works</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">From idea to live invitation in one guided flow.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-cocoa">Step {index + 1}</p>
            <h2 className="mt-3 text-2xl font-bold text-ink">{step}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventTypeLandingPage() {
  return (
    <section className="section py-14">
      <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Invitation types for modern celebrations.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {eventTypeOptions.map((type) => (
          <Link key={type.id} to={`/templates/${type.id}`} className="rounded-[2rem] bg-white p-6 shadow-soft transition hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-ink">{type.label}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">{type.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
