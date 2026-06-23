import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { eventTypeOptions, packagePlans } from "../../data/catalog";
import { createEvent, getTemplates } from "../../services/mockApi";
import type { EventType, PackageType } from "../../types/domain";

const eventFormSchema = z.object({
  title: z.string().min(3, "Event name is required."),
  hostsText: z.string().min(2, "Add at least one host."),
  date: z.string().min(1, "Date and time are required."),
  timezone: z.string().min(1, "Timezone is required."),
  rsvpDeadline: z.string().min(1, "RSVP deadline is required."),
  language: z.string().min(2, "Language is required."),
  heroSubtitle: z.string().min(10, "Add a short invitation subtitle."),
  welcomeMessage: z.string().min(10, "Add a welcome message."),
  locationLabel: z.string().min(2, "Location label is required."),
  locationAddress: z.string().min(4, "Location address is required."),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const defaultValues: EventFormValues = {
  title: "Maya and Alex",
  hostsText: "Maya Hart, Alex Reed",
  date: "2026-09-19T16:00",
  timezone: "Europe/Bucharest",
  rsvpDeadline: "2026-08-15",
  language: "en",
  heroSubtitle: "Together with their families, they invite you to celebrate.",
  welcomeMessage: "Join us for a beautiful evening of ceremony, dinner, music, and celebration.",
  locationLabel: "Ceremony and reception",
  locationAddress: "The Glasshouse Garden, Bucharest",
};

const steps = ["Event type", "Package", "Template", "Details", "Review"];

export function EventWizard() {
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState<EventType>("wedding");
  const [packageType, setPackageType] = useState<PackageType>("premium");
  const [templateId, setTemplateId] = useState("rose-vow");
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: templates = [] } = useQuery({
    queryKey: ["templates", eventType],
    queryFn: () => getTemplates(eventType),
  });

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const selectedTemplateId = useMemo(() => {
    if (templates.some((template) => template.id === templateId)) return templateId;
    return templates[0]?.id ?? templateId;
  }, [templateId, templates]);

  const createMutation = useMutation({
    mutationFn: (values: EventFormValues) =>
      createEvent({
        ...values,
        hosts: values.hostsText.split(",").map((host) => host.trim()).filter(Boolean),
        eventType,
        packageType,
        templateId: selectedTemplateId,
      }),
    onSuccess: async ({ event }) => {
      setCreatedSlug(event.slug);
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      setStep(4);
    },
  });

  async function nextStep() {
    if (step === 3) {
      const valid = await form.trigger();
      if (!valid) return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function createInvitation() {
    void form.handleSubmit((values) => createMutation.mutate(values))();
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">Creation wizard</p>
        <h2 className="mt-2 text-3xl font-bold text-ink">Build a public invitation</h2>
        <div className="mt-6 grid gap-2 sm:grid-cols-5">
          {steps.map((item, index) => (
            <div key={item} className={`rounded-full px-4 py-2 text-center text-sm font-semibold ${index === step ? "bg-ink text-white" : "bg-blush text-stone-600"}`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        {step === 0 ? (
          <ChoiceGrid
            items={eventTypeOptions.map((item) => ({ id: item.id, title: item.label, text: item.description }))}
            selectedId={eventType}
            onSelect={(id) => setEventType(id as EventType)}
          />
        ) : null}

        {step === 1 ? (
          <ChoiceGrid
            items={packagePlans.map((item) => ({ id: item.id, title: item.name, text: item.description }))}
            selectedId={packageType}
            onSelect={(id) => setPackageType(id as PackageType)}
          />
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setTemplateId(template.id)}
                className={`overflow-hidden rounded-[2rem] border text-left transition ${selectedTemplateId === template.id ? "border-ink ring-4 ring-ink/10" : "border-stone-200"}`}
              >
                <img className="h-52 w-full object-cover" src={template.previewImage} alt={template.name} />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-ink">{template.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">{template.styleTags.join(" / ")}</p>
                </div>
              </button>
            ))}
          </div>
        ) : null}

        {step === 3 ? (
          <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <Field label="Event name" error={form.formState.errors.title?.message}>
              <input className="field" {...form.register("title")} />
            </Field>
            <Field label="Hosts, separated by commas" error={form.formState.errors.hostsText?.message}>
              <input className="field" {...form.register("hostsText")} />
            </Field>
            <Field label="Date and time" error={form.formState.errors.date?.message}>
              <input className="field" type="datetime-local" {...form.register("date")} />
            </Field>
            <Field label="RSVP deadline" error={form.formState.errors.rsvpDeadline?.message}>
              <input className="field" type="date" {...form.register("rsvpDeadline")} />
            </Field>
            <Field label="Timezone" error={form.formState.errors.timezone?.message}>
              <input className="field" {...form.register("timezone")} />
            </Field>
            <Field label="Language" error={form.formState.errors.language?.message}>
              <input className="field" {...form.register("language")} />
            </Field>
            <Field label="Hero subtitle" error={form.formState.errors.heroSubtitle?.message}>
              <textarea className="field min-h-28" {...form.register("heroSubtitle")} />
            </Field>
            <Field label="Welcome message" error={form.formState.errors.welcomeMessage?.message}>
              <textarea className="field min-h-28" {...form.register("welcomeMessage")} />
            </Field>
            <Field label="Location label" error={form.formState.errors.locationLabel?.message}>
              <input className="field" {...form.register("locationLabel")} />
            </Field>
            <Field label="Location address" error={form.formState.errors.locationAddress?.message}>
              <input className="field" {...form.register("locationAddress")} />
            </Field>
          </form>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-5">
            <h3 className="text-2xl font-bold text-ink">Your invitation is ready.</h3>
            <p className="text-stone-600">Use the generated public link below. The QR code box is a placeholder for a later dependency.</p>
            <div className="rounded-3xl bg-blush p-5">
              <p className="text-sm font-semibold text-cocoa">Public URL</p>
              <Link className="mt-2 block break-all text-xl font-bold text-ink" to={`/invite/${createdSlug ?? "maya-and-alex"}`}>
                /invite/{createdSlug ?? "maya-and-alex"}
              </Link>
            </div>
            <div className="flex h-40 w-40 items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white text-center text-sm font-semibold text-stone-500">
              QR placeholder
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button type="button" className="btn-secondary" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
            Back
          </button>
          {step < 3 ? <button type="button" className="btn-primary" onClick={nextStep}>Continue</button> : null}
          {step === 3 ? (
            <button type="button" className="btn-primary" onClick={createInvitation} disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create invitation"}
            </button>
          ) : null}
          {step === 4 ? <Link className="btn-primary" to={`/invite/${createdSlug ?? "maya-and-alex"}`}>Open invitation</Link> : null}
        </div>
      </section>
    </div>
  );
}

function ChoiceGrid({ items, selectedId, onSelect }: { items: Array<{ id: string; title: string; text: string }>; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={`rounded-[2rem] border p-5 text-left transition ${selectedId === item.id ? "border-ink bg-blush ring-4 ring-ink/10" : "border-stone-200 bg-white hover:border-cocoa/40"}`}
        >
          <h3 className="text-xl font-bold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
        </button>
      ))}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      {children}
      {error ? <span className="text-sm font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}
