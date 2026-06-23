import { mockDb, mockDelay } from "../data/mockDb";
import type { EventType } from "../types/domain";

export async function getTemplates(eventType?: string) {
  await mockDelay();
  return mockDb.templates.filter((template) => template.isActive && (!eventType || template.eventTypes.includes(eventType as EventType)));
}
