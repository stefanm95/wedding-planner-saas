import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { eventTypeOptions } from "../../data/catalog";
import { getTemplates } from "../../services/mockApi";

export function TemplatesPage() {
  const { eventType } = useParams();
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["templates", eventType],
    queryFn: () => getTemplates(eventType),
  });

  return (
    <section className="section py-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">Templates</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Start with a beautiful page.</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">Browse active mock templates by event type. Selection is connected to the creation wizard.</p>
        </div>
        <Link to="/app/events/new" className="btn-primary">Create from template</Link>
      </div>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        <Link className={`rounded-full px-4 py-2 text-sm font-semibold ${!eventType ? "bg-ink text-white" : "bg-white text-stone-600"}`} to="/templates">
          All
        </Link>
        {eventTypeOptions.map((type) => (
          <Link
            key={type.id}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${eventType === type.id ? "bg-ink text-white" : "bg-white text-stone-600"}`}
            to={`/templates/${type.id}`}
          >
            {type.label}
          </Link>
        ))}
      </div>
      {isLoading ? <p className="mt-10 text-stone-500">Loading templates...</p> : null}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => (
          <article key={template.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <img className="h-64 w-full object-cover" src={template.previewImage} alt={template.name} />
            <div className="p-5">
              <h2 className="text-xl font-bold text-ink">{template.name}</h2>
              <p className="mt-2 text-sm text-stone-600">{template.styleTags.join(" / ")}</p>
              <Link to="/app/events/new" className="btn-secondary mt-5 w-full">Use this template</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
