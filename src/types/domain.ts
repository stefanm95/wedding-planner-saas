export type EventType = "wedding" | "baptism" | "birthday" | "anniversary" | "corporate" | "custom";
export type PackageType = "essential" | "premium" | "premiumPlus" | "custom";
export type EventStatus = "draft" | "published" | "archived";
export type Attendance = "yes" | "no";
export type WorkspaceRole = "workspaceOwner" | "workspaceEditor" | "workspaceViewer";
export type PlatformRole = "platformAdmin";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type User = AuthUser;

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export type WorkspaceMember = {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  createdAt: string;
};

export type Event = {
  id: string;
  workspaceId: string;
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

export type PublicInvitation = {
  event: Event;
  details: EventDetails;
  template: Template | null;
};

export type AdminSummary = {
  users: number;
  workspaces: number;
  events: number;
  templates: number;
  openSupportTickets: number;
  auditLogEntries: number;
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
