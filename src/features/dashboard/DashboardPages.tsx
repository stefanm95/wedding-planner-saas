import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/ui/EmptyState";
import { getEventById, getEvents, getRsvps } from "../../services/mockApi";

export function DashboardHomePage() {
  const { data: events = [] } = useQuery({ queryKey: ["events"], queryFn: getEvents });
  const firstEvent = events[0];
  const { data: rsvps = [] } = useQuery({
    queryKey: ["rsvps", firstEvent?.id],
    queryFn: () => getRsvps(firstEvent?.id ?? ""),
    enabled: Boolean(firstEvent),
  });

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">Overview</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">Your invitation workspace</h2>
          </div>
          <Link to="/app/events/new" className="btn-primary">New invitation</Link>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Events" value={events.length} />
        <Metric label="RSVP responses" value={rsvps.length} />
        <Metric label="Published links" value={events.filter((event) => event.status === "published").length} />
      </div>
      <EventList />
    </div>
  );
}

export function EventsPage() {
  return <EventList />;
}

function EventList() {
  const { data: events = [], isLoading } = useQuery({ queryKey: ["events"], queryFn: getEvents });

  if (isLoading) return <p className="text-stone-500">Loading events...</p>;
  if (events.length === 0) {
    return <EmptyState title="No events yet" message="Create your first invitation to generate a public page." action={<Link className="btn-primary" to="/app/events/new">Create event</Link>} />;
  }

  return (
    <section className="grid gap-4">
      {events.map((event) => (
        <article key={event.id} className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cocoa">{event.eventType} / {event.packageType}</p>
              <h2 className="mt-2 text-2xl font-bold text-ink">{event.title}</h2>
              <p className="mt-1 text-sm text-stone-500">{new Date(event.date).toLocaleString()} / RSVP by {event.rsvpDeadline}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={`/invite/${event.slug}`} className="btn-secondary">Open invite</Link>
              <Link to={`/app/events/${event.id}`} className="btn-primary">Manage</Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export function EventDetailPage() {
  const { eventId = "" } = useParams();
  const { data: event } = useQuery({ queryKey: ["event", eventId], queryFn: () => getEventById(eventId) });

  if (!event) return <EmptyState title="Event not found" message="This event may not exist in the mock dataset." />;

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">Event</p>
        <h2 className="mt-2 text-3xl font-bold text-ink">{event.title}</h2>
        <p className="mt-2 text-stone-600">Public URL: <Link className="font-semibold text-ink" to={`/invite/${event.slug}`}>/invite/{event.slug}</Link></p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="btn-secondary" to={`/app/events/${event.id}/rsvps`}>RSVPs</Link>
          <Link className="btn-secondary" to={`/app/events/${event.id}/guests`}>Guests</Link>
          <Link className="btn-secondary" to={`/app/events/${event.id}/settings`}>Settings</Link>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderCard title="Editor prepared" text="The editor route is reserved for template and content customization." />
        <PlaceholderCard title="QR placeholder" text="QR generation will be added later with a focused dependency." />
      </div>
    </div>
  );
}

export function RsvpsPage() {
  const { eventId = "" } = useParams();
  const { data: rsvps = [], isLoading } = useQuery({ queryKey: ["rsvps", eventId], queryFn: () => getRsvps(eventId) });

  if (isLoading) return <p className="text-stone-500">Loading RSVPs...</p>;

  return (
    <section className="grid gap-4">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <h2 className="text-3xl font-bold text-ink">RSVP responses</h2>
        <p className="mt-2 text-stone-600">{rsvps.length} guest responses in the current mock session.</p>
      </div>
      {rsvps.map((rsvp) => (
        <article key={rsvp.id} className="rounded-[2rem] bg-white p-5 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-ink">{rsvp.guestName}</h3>
              <p className="text-sm text-stone-600">{rsvp.attending === "yes" ? "Attending" : "Not attending"} / {rsvp.guestCount} guests</p>
            </div>
            <p className="text-sm text-stone-500">{new Date(rsvp.submittedAt).toLocaleString()}</p>
          </div>
          {rsvp.message ? <p className="mt-3 text-sm text-stone-600">{rsvp.message}</p> : null}
        </article>
      ))}
    </section>
  );
}

export function PlaceholderAppPage({ title }: { title: string }) {
  return <PlaceholderCard title={title} text="This route is intentionally prepared as a placeholder for the next milestone." />;
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold text-cocoa">{label}</p>
      <p className="mt-3 text-4xl font-bold text-ink">{value}</p>
    </div>
  );
}

function PlaceholderCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-3 text-stone-600">{text}</p>
    </div>
  );
}
