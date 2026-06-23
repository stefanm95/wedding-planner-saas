import { mockDb, mockDelay } from "../data/mockDb";
import type { RSVP, RSVPInput } from "../types/domain";

export async function getRsvps(eventId: string) {
  await mockDelay();
  return mockDb.rsvps.filter((rsvp) => rsvp.eventId === eventId);
}

export async function submitRsvp(eventId: string, input: RSVPInput) {
  await mockDelay();
  const event = mockDb.events.find((item) => item.id === eventId);
  if (!event || event.status !== "published") {
    throw new Error("RSVP is only available for published invitations.");
  }

  const rsvp: RSVP = {
    id: `rsvp_${crypto.randomUUID()}`,
    eventId,
    ...input,
    submittedAt: new Date().toISOString(),
  };
  mockDb.rsvps = [rsvp, ...mockDb.rsvps];
  return rsvp;
}
