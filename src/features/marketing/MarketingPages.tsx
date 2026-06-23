import { Link } from "react-router-dom";
import { eventTypeOptions, packagePlans, templates } from "../../data/catalog";

const howSteps = [
  "Choose the event type",
  "Pick a template and package",
  "Add event details",
  "Share the public link",
  "Collect RSVPs",
  "Manage guests from your workspace",
];

const faqs = [
  ["Is this only for weddings?", "No. Weddings are the primary vertical, but the product is built for baptisms, birthdays, anniversaries, corporate moments, and custom private events."],
  ["Do guests need accounts?", "No. Guests open the invitation link and submit RSVP responses without logging in."],
  ["Are payments active?", "Not yet. Packages are mocked so the product flow is ready for payments later."],
  ["Can I publish a draft later?", "Yes. Events start as drafts and become public only after publishing from the workspace dashboard."],
];

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <EventTypesSection />
      <TemplatePreviewSection />
      <PackagesPreviewSection />
      <RsvpManagementSection />
      <WhyDigitalSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}

export function HowItWorksPage() {
  return (
    <>
      <HowItWorksSection />
      <RsvpManagementSection />
      <FinalCtaSection />
    </>
  );
}

export function EventTypeLandingPage() {
  return (
    <>
      <EventTypesSection />
      <TemplatePreviewSection />
      <FinalCtaSection />
    </>
  );
}

export function HeroSection() {
  return (
    <section className="section grid min-h-[calc(100vh-5rem)] items-center gap-10 py-14 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">Digital invitations for life events</p>
        <h1 className="mt-5 text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Create a beautiful invitation, share the link, collect RSVPs.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          Wedly helps hosts create premium invitation pages for weddings, baptisms, birthdays, anniversaries, and private events, then manage every response from a calm workspace.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/create" className="btn-primary">Start your invitation</Link>
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
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section py-16">
      <SectionIntro eyebrow="How it works" title="From idea to public invitation in one guided flow." text="The MVP proves the core journey: template, event details, generated link, RSVP, and dashboard." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {howSteps.map((step, index) => (
          <article key={step} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-cocoa">Step {index + 1}</p>
            <h3 className="mt-3 text-2xl font-bold text-ink">{step}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventTypesSection() {
  return (
    <section id="event-types" className="section py-16">
      <SectionIntro eyebrow="Event types" title="Built for life events, not just weddings." text="Start with a familiar event type, then customize the invitation for your celebration." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {eventTypeOptions.map((type) => (
          <Link key={type.id} to={`/templates/${type.id}`} className="rounded-[2rem] bg-white p-6 shadow-soft transition hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-ink">{type.label}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">{type.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TemplatePreviewSection() {
  return (
    <section id="templates" className="section py-16">
      <SectionIntro eyebrow="Templates" title="Premium pages that feel personal and mobile-first." text="Templates are mocked today, but the catalog is already structured for package availability and event types." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {templates.slice(0, 4).map((template) => (
          <article key={template.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <img className="h-56 w-full object-cover" src={template.previewImage} alt={template.name} />
            <div className="p-5">
              <h3 className="text-xl font-bold text-ink">{template.name}</h3>
              <p className="mt-2 text-sm text-stone-600">{template.styleTags.join(" / ")}</p>
            </div>
          </article>
        ))}
      </div>
      <Link to="/templates" className="btn-secondary mt-8">View templates</Link>
    </section>
  );
}

export function PackagesPreviewSection() {
  return (
    <section id="pricing" className="section py-16">
      <SectionIntro eyebrow="Packages" title="Simple package structure, ready for payments later." text="Essential, Premium, Premium Plus, and Custom are visible now while checkout remains mocked." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {packagePlans.map((plan) => (
          <article key={plan.id} className={`rounded-[2rem] border p-6 ${plan.highlighted ? "border-ink bg-ink text-white" : "border-white bg-white"}`}>
            <p className={plan.highlighted ? "text-sm text-champagne" : "text-sm text-cocoa"}>{plan.priceLabel}</p>
            <h3 className="mt-3 text-2xl font-bold">{plan.name}</h3>
            <p className={`mt-3 text-sm leading-6 ${plan.highlighted ? "text-white/75" : "text-stone-600"}`}>{plan.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RsvpManagementSection() {
  return (
    <section className="section grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">RSVP and guest management</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">Know who is coming without chasing messages.</h2>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          Guests answer from the public invitation. Owners manage confirmations, guest counts, notes, transport needs, and future exports from the workspace.
        </p>
      </div>
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        {["Confirmed guests", "Companions", "Menu choice", "Transport needs", "Guest notes"].map((item, index) => (
          <div key={item} className="flex items-center justify-between border-b border-stone-100 py-4 last:border-0">
            <span className="font-semibold text-ink">{item}</span>
            <span className="rounded-full bg-blush px-3 py-1 text-sm font-bold text-cocoa">{index + 2}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhyDigitalSection() {
  return (
    <section className="section py-16">
      <SectionIntro eyebrow="Why digital" title="Fast to share, easy to update, beautiful on every phone." text="Digital invitations reduce scattered messages, outdated details, and manual RSVP tracking while keeping the emotional feel of a designed invite." />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {["Instant public link", "No guest accounts", "Private event workspace"].map((item) => (
          <div key={item} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h3 className="text-xl font-bold text-ink">{item}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">Prepared as clean product architecture with mock services ready to swap for a real backend.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section py-16">
      <SectionIntro eyebrow="FAQ" title="Answers before you start." text="The product is still mocked, but the flow is shaped for a secure SaaS foundation." />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {faqs.map(([question, answer]) => (
          <article key={question} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h3 className="text-xl font-bold text-ink">{question}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="section py-16">
      <div className="rounded-[2.5rem] bg-ink p-8 text-white shadow-soft sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-champagne">Start your invitation</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Create the link your guests will actually use.</h2>
        <p className="mt-5 max-w-2xl text-white/75">Launch a draft workspace, choose a template, and prepare a beautiful invitation for your next event.</p>
        <Link to="/create" className="btn-secondary mt-8">Start invitation</Link>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-stone-600">{text}</p>
    </div>
  );
}
