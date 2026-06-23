import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/ui/EmptyState";
import { useAuthStore } from "../auth/authStore";
import { getEventById, getEvents, updateEventStatus } from "../../services/eventService";
import { getRsvps } from "../../services/rsvpService";
import type { Event, EventStatus, RSVP } from "../../types/domain";

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
      {events.length === 0 ? (
        <EmptyState title="Create your first invitation" message="Start with event details, save a draft, then publish when your invitation is ready to share." action={<Link className="btn-primary" to="/app/events/new">Create your first invitation</Link>} />
      ) : (
        <>
          {firstEvent ? <InvitationWorkspace event={firstEvent} rsvps={rsvps} /> : null}
          <EventList />
        </>
      )}
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
    return <EmptyState title="Start your event workspace" message="You do not have any invitations yet. Create your first draft, choose a template, then publish when it is ready." action={<Link className="btn-primary" to="/app/events/new">Create your first invitation</Link>} />;
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
              <StatusBadge status={event.status} />
            </div>
            <div className="flex flex-wrap gap-2">
              {event.status === "published" ? <Link to={`/invite/${event.slug}`} className="btn-secondary">Open invite</Link> : null}
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
  const queryClient = useQueryClient();
  const workspaceRole = useAuthStore((state) => state.workspaceRole);
  const { data: event } = useQuery({ queryKey: ["event", eventId], queryFn: () => getEventById(eventId) });
  const { data: rsvps = [] } = useQuery({ queryKey: ["rsvps", eventId], queryFn: () => getRsvps(eventId), enabled: Boolean(eventId) });
  const canPublish = workspaceRole === "workspaceOwner" || workspaceRole === "workspaceEditor";
  const statusMutation = useMutation({
    mutationFn: (status: EventStatus) => updateEventStatus(eventId, status, workspaceRole),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["event", eventId] }),
        queryClient.invalidateQueries({ queryKey: ["events"] }),
      ]);
    },
  });

  if (!event) return <EmptyState title="Event not found" message="This event may not exist in the mock dataset." />;

  return <InvitationWorkspace event={event} rsvps={rsvps} canPublish={canPublish} statusMutation={statusMutation} />;
}

export function RsvpsPage() {
  const { eventId = "" } = useParams();
  const { data: rsvps = [], isLoading } = useQuery({ queryKey: ["rsvps", eventId], queryFn: () => getRsvps(eventId) });

  if (isLoading) return <p className="text-stone-500">Loading RSVPs...</p>;

  return <RsvpTable rsvps={rsvps} title="RSVP list" />;
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

function InvitationWorkspace({
  event,
  rsvps,
  canPublish = true,
  statusMutation,
}: {
  event: Event;
  rsvps: RSVP[];
  canPublish?: boolean;
  statusMutation?: ReturnType<typeof useMutation<Event, Error, EventStatus>>;
}) {
  const summary = getRsvpSummary(rsvps);
  const publicPath = `/invite/${event.slug}`;

  function copyLink() {
    const url = `${window.location.origin}${publicPath}`;
    void navigator.clipboard?.writeText(url);
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">My event invitation workspace</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold text-ink">{event.title}</h2>
              <StatusBadge status={event.status} />
            </div>
            <div className="mt-5 rounded-3xl bg-blush p-5">
              <p className="text-sm font-semibold text-cocoa">Public invitation link</p>
              <p className="mt-2 break-all text-xl font-bold text-ink">{publicPath}</p>
              <p className="mt-2 text-sm text-stone-600">{event.status === "published" ? "Guests can open this invitation now." : "This link is reserved. Publish when you are ready to share it."}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="btn-secondary" onClick={copyLink}>Copy link</button>
                {event.status === "published" ? <Link className="btn-primary" to={publicPath}>Open invitation</Link> : <span className="btn-secondary opacity-60">Open after publishing</span>}
              </div>
            </div>
          </div>
          <div className="flex h-44 w-44 items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white text-center text-sm font-semibold text-stone-500">
            QR placeholder
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="btn-secondary" to={`/app/events/${event.id}/editor`}>Edit invitation</Link>
          {event.status === "published" ? <Link className="btn-secondary" to={publicPath}>Preview invitation</Link> : <span className="btn-secondary opacity-60">Preview after publishing</span>}
          {canPublish && event.status !== "published" ? <button type="button" className="btn-primary" disabled={statusMutation?.isPending} onClick={() => statusMutation?.mutate("published")}>Publish</button> : null}
          {canPublish && event.status === "published" ? <button type="button" className="btn-secondary" disabled={statusMutation?.isPending} onClick={() => statusMutation?.mutate("draft")}>Unpublish</button> : null}
          <Link className="btn-secondary" to={`/app/events/${event.id}/guests`}>Manage guests</Link>
          <Link className="btn-secondary" to={`/app/events/${event.id}/rsvps`}>RSVP list</Link>
        </div>
        {statusMutation?.isError ? <p className="mt-3 text-sm font-semibold text-red-600">{statusMutation.error.message}</p> : null}
      </section>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Metric label="RSVP responses" value={summary.total} />
        <Metric label="Attending guests" value={summary.attendingGuests} />
        <Metric label="Not attending" value={summary.notAttending} />
        <Metric label="Children" value={summary.children} />
        <Metric label="Companions" value={summary.companions} />
        <Metric label="Transport requests" value={summary.transportRequests} />
      </div>

      <RsvpTable rsvps={rsvps.slice(0, 5)} title="Recent RSVP responses" />
    </div>
  );
}

function RsvpTable({ rsvps, title }: { rsvps: RSVP[]; title: string }) {
  const summary = getRsvpSummary(rsvps);

  return (
    <section className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
      <div className="flex flex-col gap-2 border-b border-stone-100 p-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink">{title}</h2>
          <p className="mt-1 text-sm text-stone-600">{summary.total} responses / {summary.attendingGuests} attending guests</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-blush text-xs uppercase tracking-[0.12em] text-cocoa">
            <tr>
              <th className="px-4 py-3">Guest name</th>
              <th className="px-4 py-3">Attending</th>
              <th className="px-4 py-3">Guest count</th>
              <th className="px-4 py-3">Children</th>
              <th className="px-4 py-3">Companions</th>
              <th className="px-4 py-3">Menu choice</th>
              <th className="px-4 py-3">Transport</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Submitted date</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp) => (
              <tr key={rsvp.id} className="border-t border-stone-100">
                <td className="px-4 py-4 font-semibold text-ink">{rsvp.guestName}</td>
                <td className="px-4 py-4">{rsvp.attending === "yes" ? "Yes" : "No"}</td>
                <td className="px-4 py-4">{rsvp.guestCount}</td>
                <td className="px-4 py-4">{rsvp.childrenCount ?? 0}</td>
                <td className="px-4 py-4">{rsvp.companions.length ? rsvp.companions.join(", ") : "-"}</td>
                <td className="px-4 py-4">{rsvp.menuChoice || "-"}</td>
                <td className="px-4 py-4">{rsvp.needsTransport ? rsvp.transportLocation || "Requested" : "No"}</td>
                <td className="max-w-64 px-4 py-4 text-stone-600">{rsvp.message || "-"}</td>
                <td className="px-4 py-4 text-stone-500">{new Date(rsvp.submittedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rsvps.length === 0 ? <p className="p-6 text-sm text-stone-500">No RSVP responses yet.</p> : null}
    </section>
  );
}

function getRsvpSummary(rsvps: RSVP[]) {
  return {
    total: rsvps.length,
    attendingGuests: rsvps.filter((rsvp) => rsvp.attending === "yes").reduce((sum, rsvp) => sum + rsvp.guestCount, 0),
    notAttending: rsvps.filter((rsvp) => rsvp.attending === "no").length,
    children: rsvps.reduce((sum, rsvp) => sum + (rsvp.childrenCount ?? 0), 0),
    companions: rsvps.reduce((sum, rsvp) => sum + rsvp.companions.length, 0),
    transportRequests: rsvps.filter((rsvp) => rsvp.needsTransport).length,
  };
}

function StatusBadge({ status }: { status: EventStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span className="inline-flex rounded-full bg-blush px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-cocoa">{label}</span>;
}

function PlaceholderCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-3 text-stone-600">{text}</p>
    </div>
  );
}
