import { mockDb, mockDelay } from "../data/mockDb";
import type { PublicInvitation } from "../types/domain";

export async function getInvitationBySlug(slug: string): Promise<PublicInvitation | null> {
  await mockDelay();
  const event = mockDb.events.find((item) => item.slug === slug && item.status === "published");
  if (!event) return null;

  const details = mockDb.eventDetails.find((item) => item.eventId === event.id);
  if (!details) return null;

  return {
    event,
    details,
    template: mockDb.templates.find((template) => template.id === event.templateId) ?? null,
  };
}
