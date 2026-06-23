import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitRsvp } from "../../services/rsvpService";
import type { RSVPInput } from "../../types/domain";

const rsvpSchema = z.object({
  guestName: z.string().min(2, "Please add your name."),
  attending: z.enum(["yes", "no"]),
  guestCount: z.number().min(0).max(10),
  companionsText: z.string().optional(),
  menuChoice: z.string().optional(),
  childrenCount: z.number().min(0).max(10).optional(),
  needsTransport: z.boolean().optional(),
  transportLocation: z.string().optional(),
  accommodationNeeded: z.boolean().optional(),
  message: z.string().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export function RsvpForm({ eventId }: { eventId: string }) {
  const queryClient = useQueryClient();
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guestName: "",
      attending: "yes",
      guestCount: 1,
      companionsText: "",
      menuChoice: "",
      childrenCount: 0,
      needsTransport: false,
      transportLocation: "",
      accommodationNeeded: false,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: RsvpFormValues) => {
      const payload: RSVPInput = {
        guestName: values.guestName,
        attending: values.attending,
        guestCount: values.attending === "yes" ? values.guestCount : 0,
        companions: values.companionsText?.split(",").map((item) => item.trim()).filter(Boolean) ?? [],
        menuChoice: values.menuChoice,
        childrenCount: values.childrenCount,
        needsTransport: values.needsTransport,
        transportLocation: values.transportLocation,
        accommodationNeeded: values.accommodationNeeded,
        message: values.message,
      };
      return submitRsvp(eventId, payload);
    },
    onSuccess: async () => {
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ["rsvps", eventId] });
    },
  });

  return (
    <form className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-soft" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">RSVP</p>
        <h2 className="mt-2 text-3xl font-bold text-ink">Will you join us?</h2>
      </div>
      <label className="grid gap-2">
        <span className="label">Guest name</span>
        <input className="field" {...form.register("guestName")} />
        {form.formState.errors.guestName ? <span className="text-sm font-semibold text-red-600">{form.formState.errors.guestName.message}</span> : null}
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="rounded-2xl border border-stone-200 p-4">
          <input type="radio" value="yes" {...form.register("attending")} /> Yes, attending
        </label>
        <label className="rounded-2xl border border-stone-200 p-4">
          <input type="radio" value="no" {...form.register("attending")} /> Sadly no
        </label>
      </div>
      <label className="grid gap-2">
        <span className="label">Guest count</span>
        <input className="field" type="number" min="0" max="10" {...form.register("guestCount", { valueAsNumber: true })} />
      </label>
      <label className="grid gap-2">
        <span className="label">Companions, separated by commas</span>
        <input className="field" {...form.register("companionsText")} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="label">Menu choice</span>
          <input className="field" {...form.register("menuChoice")} />
        </label>
        <label className="grid gap-2">
          <span className="label">Children count</span>
          <input className="field" type="number" min="0" {...form.register("childrenCount", { valueAsNumber: true })} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="rounded-2xl border border-stone-200 p-4">
          <input type="checkbox" {...form.register("needsTransport")} /> Needs transport
        </label>
        <label className="rounded-2xl border border-stone-200 p-4">
          <input type="checkbox" {...form.register("accommodationNeeded")} /> Needs accommodation
        </label>
      </div>
      <label className="grid gap-2">
        <span className="label">Transport location</span>
        <input className="field" {...form.register("transportLocation")} />
      </label>
      <label className="grid gap-2">
        <span className="label">Message</span>
        <textarea className="field min-h-28" {...form.register("message")} />
      </label>
      <button className="btn-primary" type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit RSVP"}
      </button>
      {mutation.isSuccess ? <p className="rounded-2xl bg-sage p-4 text-sm font-semibold text-ink">Thank you. Your RSVP was saved in this mock session.</p> : null}
    </form>
  );
}
