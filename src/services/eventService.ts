import { mockDb, mockDelay } from "../data/mockDb";
import { mockUser, mockWorkspace } from "../data/mockData";
import { createSlug } from "../lib/slug";
import type { CreateEventInput, Event, EventDetails, EventStatus, WorkspaceRole } from "../types/domain";

export async function getEvents() {
  await mockDelay();
  return mockDb.events;
}

export async function getEventById(eventId: string) {
  await mockDelay();
  return mockDb.events.find((event) => event.id === eventId) ?? null;
}

export async function createEvent(input: CreateEventInput) {
  await mockDelay();
  const now = new Date().toISOString();
  const event: Event = {
    id: `event_${crypto.randomUUID()}`,
    workspaceId: mockWorkspace.id,
    ownerId: mockUser.id,
    eventType: input.eventType,
    packageType: input.packageType,
    templateId: input.templateId,
    slug: createSlug(input.title, mockDb.events.map((item) => item.slug)),
    status: "draft",
    title: input.title,
    hosts: input.hosts,
    date: input.date,
    timezone: input.timezone,
    rsvpDeadline: input.rsvpDeadline,
    language: input.language,
    createdAt: now,
    updatedAt: now,
  };

  const details: EventDetails = {
    eventId: event.id,
    heroTitle: input.title,
    heroSubtitle: input.heroSubtitle,
    welcomeMessage: input.welcomeMessage,
    mainImageUrl: mockDb.templates.find((template) => template.id === input.templateId)?.previewImage ?? "",
    galleryImages: [],
    locations: [
      {
        id: `loc_${crypto.randomUUID()}`,
        label: input.locationLabel,
        address: input.locationAddress,
        time: new Date(input.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ],
    schedule: [
      { id: `sch_${crypto.randomUUID()}`, time: "16:00", title: "Guest arrival" },
      { id: `sch_${crypto.randomUUID()}`, time: "18:00", title: "Main celebration" },
    ],
    customSections: [],
  };

  mockDb.events = [event, ...mockDb.events];
  mockDb.eventDetails = [details, ...mockDb.eventDetails];
  return { event, details };
}

export async function updateEventStatus(eventId: string, status: EventStatus, workspaceRole: WorkspaceRole | null) {
  await mockDelay();
  if (workspaceRole !== "workspaceOwner" && workspaceRole !== "workspaceEditor") {
    throw new Error("You do not have permission to change event status.");
  }

  const event = mockDb.events.find((item) => item.id === eventId);
  if (!event) throw new Error("Event not found.");

  event.status = status;
  event.updatedAt = new Date().toISOString();
  return event;
}
