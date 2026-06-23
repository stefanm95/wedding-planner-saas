export type EventType = "wedding" | "baptism" | "birthday" | "anniversary" | "corporate" | "custom";
export type PackageType = "essential" | "premium" | "premiumPlus" | "custom";
export type EventStatus = "draft" | "published" | "archived";
export type Attendance = "yes" | "no";

export type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type Event = {
  id: string;
  ownerId: string;
  eventType: EventType;
  packageType: PackageType;
  templateId: string;
  slug: string;
  status: EventStatus;
  title: string;
  hosts: string[];
  date: string;
  timezone: string;
  rsvpDeadline: string;
  language: string;
  createdAt: string;
  updatedAt: string;
};

export type EventDetails = {
  eventId: string;
  heroTitle: string;
  heroSubtitle: string;
  welcomeMessage: string;
  mainImageUrl: string;
  galleryImages: string[];
  locations: EventLocation[];
  schedule: ScheduleItem[];
  dressCode?: string;
  transportInfo?: string;
  accommodationInfo?: string;
  customSections: CustomSection[];
};

export type EventLocation = {
  id: string;
  label: string;
  address: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
  time?: string;
};

export type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  description?: string;
};

export type CustomSection = {
  id: string;
  title: string;
  body: string;
};

export type RSVP = {
  id: string;
  eventId: string;
  guestName: string;
  attending: Attendance;
  guestCount: number;
  companions: string[];
  menuChoice?: string;
  childrenCount?: number;
  needsTransport?: boolean;
  transportLocation?: string;
  accommodationNeeded?: boolean;
  message?: string;
  submittedAt: string;
};

export type Template = {
  id: string;
  name: string;
  eventTypes: EventType[];
  previewImage: string;
  packageAvailability: PackageType[];
  styleTags: string[];
  isActive: boolean;
};

export type PackagePlan = {
  id: PackageType;
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type CreateEventInput = {
  eventType: EventType;
  packageType: PackageType;
  templateId: string;
  title: string;
  hosts: string[];
  date: string;
  timezone: string;
  rsvpDeadline: string;
  language: string;
  heroSubtitle: string;
  welcomeMessage: string;
  locationLabel: string;
  locationAddress: string;
};

export type RSVPInput = Pick<
  RSVP,
  "guestName" | "attending" | "guestCount" | "companions" | "menuChoice" | "childrenCount" | "needsTransport" | "transportLocation" | "accommodationNeeded" | "message"
>;
