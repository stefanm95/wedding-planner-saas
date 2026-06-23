import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/ui/EmptyState";
import { getInvitationBySlug } from "../../services/invitationService";
import { RsvpForm } from "../rsvp/RsvpForm";

export function InvitationPage() {
  const { slug = "" } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["invitation", slug],
    queryFn: () => getInvitationBySlug(slug),
  });

  if (isLoading) return <div className="section py-16 text-stone-500">Loading invitation...</div>;
  if (!data?.event || !data.details) {
    return (
      <main className="min-h-screen bg-[#fffaf7] py-16">
        <div className="section">
          <EmptyState title="Invitation not found" message="This public link is not active or does not exist." action={<Link className="btn-primary" to="/">Go home</Link>} />
        </div>
      </main>
    );
  }

  const { event, details, template } = data;

  return (
    <main className="bg-[#fffaf7]">
      <section className="relative min-h-screen overflow-hidden">
        <img className="absolute inset-0 h-full w-full object-cover" src={details.mainImageUrl || template?.previewImage} alt={event.title} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-[#fffaf7]" />
        <div className="section relative flex min-h-screen items-end pb-16 pt-28 text-white">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em]">You are invited</p>
            <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">{details.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{details.heroSubtitle}</p>
          </div>
        </div>
      </section>
      <section className="section grid gap-10 py-16 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-6">
          <article className="rounded-[2rem] bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">Welcome</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: "full" })}</h2>
            <p className="mt-4 text-lg leading-8 text-stone-600">{details.welcomeMessage}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-ink">Locations</h2>
            <div className="mt-5 grid gap-4">
              {details.locations.map((location) => (
                <div key={location.id} className="rounded-2xl bg-blush p-4">
                  <p className="font-bold text-ink">{location.label}</p>
                  <p className="mt-1 text-sm text-stone-600">{location.address}</p>
                  {location.time ? <p className="mt-2 text-sm font-semibold text-cocoa">{location.time}</p> : null}
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-ink">Schedule</h2>
            <div className="mt-5 grid gap-3">
              {details.schedule.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-stone-100 p-4">
                  <span className="font-bold text-cocoa">{item.time}</span>
                  <span className="font-semibold text-ink">{item.title}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
        <div className="lg:sticky lg:top-8 lg:self-start">
          <RsvpForm eventId={event.id} />
        </div>
      </section>
    </main>
  );
}
