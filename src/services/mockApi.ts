import { packagePlans, templates } from "../data/catalog";
import { mockEventDetails, mockEvents, mockRsvps, mockUser } from "../data/mockData";
import { createSlug } from "../lib/slug";
import type { CreateEventInput, Event, EventDetails, RSVP, RSVPInput } from "../types/domain";

let events = [...mockEvents];
let eventDetails = [...mockEventDetails];
let rsvps = [...mockRsvps];

const delay = async () => new Promise((resolve) => window.setTimeout(resolve, 160));

export async function getCurrentUser() {
  await delay();
  return mockUser;
}

export async function getPackages() {
  await delay();
  return packagePlans;
}

export async function getTemplates(eventType?: string) {
  await delay();
  return templates.filter((template) => template.isActive && (!eventType || template.eventTypes.includes(eventType as never)));
}

export async function getEvents() {
  await delay();
  return events;
}

export async function getEventById(eventId: string) {
  await delay();
  return events.find((event) => event.id === eventId) ?? null;
}

export async function getInvitationBySlug(slug: string) {
  await delay();
  const event = events.find((item) => item.slug === slug && item.status !== "archived");
  if (!event) return null;

  return {
    event,
    details: eventDetails.find((details) => details.eventId === event.id) ?? null,
    template: templates.find((template) => template.id === event.templateId) ?? null,
  };
}

export async function createEvent(input: CreateEventInput) {
  await delay();
  const now = new Date().toISOString();
  const event: Event = {
    id: `event_${crypto.randomUUID()}`,
    ownerId: mockUser.id,
    eventType: input.eventType,
    packageType: input.packageType,
    templateId: input.templateId,
    slug: createSlug(input.title, events.map((item) => item.slug)),
    status: "published",
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
    mainImageUrl: templates.find((template) => template.id === input.templateId)?.previewImage ?? "",
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

  events = [event, ...events];
  eventDetails = [details, ...eventDetails];
  return { event, details };
}

export async function getRsvps(eventId: string) {
  await delay();
  return rsvps.filter((rsvp) => rsvp.eventId === eventId);
}

export async function submitRsvp(eventId: string, input: RSVPInput) {
  await delay();
  const rsvp: RSVP = {
    id: `rsvp_${crypto.randomUUID()}`,
    eventId,
    ...input,
    submittedAt: new Date().toISOString(),
  };
  rsvps = [rsvp, ...rsvps];
  return rsvp;
}
