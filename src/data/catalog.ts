import type { EventType, PackagePlan, Template } from "../types/domain";

export const eventTypeOptions: Array<{ id: EventType; label: string; description: string }> = [
  { id: "wedding", label: "Wedding", description: "Elegant invitations for ceremonies and receptions." },
  { id: "baptism", label: "Baptism", description: "Warm pages for christening days and family gatherings." },
  { id: "birthday", label: "Kids birthday", description: "Playful invitations for joyful birthday parties." },
  { id: "anniversary", label: "Anniversary", description: "Memorable pages for milestones and private dinners." },
  { id: "corporate", label: "Corporate event", description: "Polished pages for launches, retreats, and galas." },
  { id: "custom", label: "Custom event", description: "Flexible setup for a special celebration." },
];

export const packagePlans: PackagePlan[] = [
  {
    id: "essential",
    name: "Essential",
    priceLabel: "Mocked",
    description: "A refined one-page invitation with simple RSVP.",
    features: ["One-page invitation", "Simple RSVP", "Public link", "QR placeholder", "Basic dashboard"],
  },
  {
    id: "premium",
    name: "Premium",
    priceLabel: "Mocked",
    description: "More customization and richer RSVP fields.",
    features: ["Everything in Essential", "RSVP+ fields", "Guest export prepared", "Table placeholder", "More templates"],
    highlighted: true,
  },
  {
    id: "premiumPlus",
    name: "Premium Plus",
    priceLabel: "Mocked",
    description: "Planning tools prepared for larger events.",
    features: ["Everything in Premium", "Media background prepared", "Custom questions later", "Checklist prepared", "Budget and vendors later"],
  },
  {
    id: "custom",
    name: "Custom",
    priceLabel: "Contact",
    description: "A manual request flow for unique event needs.",
    features: ["Personal consultation", "Custom design request", "Advanced integrations later"],
  },
];

export const templates: Template[] = [
  {
    id: "rose-vow",
    name: "Rose Vow",
    eventTypes: ["wedding", "anniversary"],
    previewImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    packageAvailability: ["essential", "premium", "premiumPlus"],
    styleTags: ["romantic", "floral", "soft"],
    isActive: true,
  },
  {
    id: "chapel-light",
    name: "Chapel Light",
    eventTypes: ["baptism", "wedding"],
    previewImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
    packageAvailability: ["premium", "premiumPlus"],
    styleTags: ["classic", "bright", "family"],
    isActive: true,
  },
  {
    id: "little-confetti",
    name: "Little Confetti",
    eventTypes: ["birthday", "custom"],
    previewImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
    packageAvailability: ["essential", "premium"],
    styleTags: ["playful", "colorful", "modern"],
    isActive: true,
  },
  {
    id: "studio-gala",
    name: "Studio Gala",
    eventTypes: ["corporate", "custom"],
    previewImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    packageAvailability: ["premium", "premiumPlus", "custom"],
    styleTags: ["editorial", "minimal", "premium"],
    isActive: true,
  },
];
