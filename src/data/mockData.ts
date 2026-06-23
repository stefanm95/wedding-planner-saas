import type { Event, EventDetails, RSVP, User } from "../types/domain";

export const mockUser: User = {
  id: "user_001",
  email: "owner@example.com",
  displayName: "Maya Hart",
  createdAt: "2026-01-04T10:00:00.000Z",
};

export const mockEvents: Event[] = [
  {
    id: "event_001",
    ownerId: "user_001",
    eventType: "wedding",
    packageType: "premium",
    templateId: "rose-vow",
    slug: "maya-and-alex",
    status: "published",
    title: "Maya and Alex",
    hosts: ["Maya Hart", "Alex Reed"],
    date: "2026-09-19T16:00:00.000Z",
    timezone: "Europe/Bucharest",
    rsvpDeadline: "2026-08-15",
    language: "en",
    createdAt: "2026-02-01T10:00:00.000Z",
    updatedAt: "2026-02-03T10:00:00.000Z",
  },
];

export const mockEventDetails: EventDetails[] = [
  {
    eventId: "event_001",
    heroTitle: "Maya and Alex",
    heroSubtitle: "Together with their families, they invite you to celebrate their wedding day.",
    welcomeMessage: "Join us for an intimate evening of vows, dinner, music, and people we love most.",
    mainImageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [],
    locations: [
      {
        id: "loc_001",
        label: "Ceremony and reception",
        address: "The Glasshouse Garden, Bucharest",
        time: "16:00",
        googleMapsUrl: "https://maps.google.com",
      },
    ],
    schedule: [
      { id: "sch_001", time: "16:00", title: "Ceremony" },
      { id: "sch_002", time: "18:00", title: "Dinner" },
      { id: "sch_003", time: "20:00", title: "First dance" },
    ],
    dressCode: "Garden formal",
    transportInfo: "Parking and ride-share pickup are available at the main entrance.",
    accommodationInfo: "Preferred hotel details will be shared after RSVP.",
    customSections: [],
  },
];

export const mockRsvps: RSVP[] = [
  {
    id: "rsvp_001",
    eventId: "event_001",
    guestName: "Nora Blake",
    attending: "yes",
    guestCount: 2,
    companions: ["Evan Blake"],
    menuChoice: "Vegetarian",
    childrenCount: 0,
    needsTransport: false,
    accommodationNeeded: false,
    message: "So excited to celebrate with you.",
    submittedAt: "2026-03-10T12:30:00.000Z",
  },
  {
    id: "rsvp_002",
    eventId: "event_001",
    guestName: "Liam Stone",
    attending: "no",
    guestCount: 0,
    companions: [],
    message: "Sending love from abroad.",
    submittedAt: "2026-03-12T09:20:00.000Z",
  },
];
