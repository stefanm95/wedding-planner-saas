import { useQuery } from "@tanstack/react-query";
import {
  getAdminEvents,
  getAdminPlans,
  getAdminSummary,
  getAdminTemplates,
  getAdminUsers,
  getAdminWorkspaces,
} from "../../services/adminService";

export function AdminOverviewPage() {
  const { data } = useQuery({ queryKey: ["admin-summary"], queryFn: getAdminSummary });

  return (
    <AdminSection title="Admin overview" description="Internal CRM snapshot for platform operations.">
      <div className="grid gap-4 md:grid-cols-3">
        <AdminMetric label="Users" value={data?.users ?? 0} />
        <AdminMetric label="Workspaces" value={data?.workspaces ?? 0} />
        <AdminMetric label="Events" value={data?.events ?? 0} />
        <AdminMetric label="Templates" value={data?.templates ?? 0} />
        <AdminMetric label="Support tickets" value={data?.openSupportTickets ?? 0} />
        <AdminMetric label="Audit entries" value={data?.auditLogEntries ?? 0} />
      </div>
    </AdminSection>
  );
}

export function AdminUsersPage() {
  const { data = [] } = useQuery({ queryKey: ["admin-users"], queryFn: getAdminUsers });
  return (
    <AdminSection title="Users" description="Mock user directory prepared for support tooling.">
      {data.map((user) => <AdminRow key={user.id} title={user.displayName} meta={user.email} />)}
    </AdminSection>
  );
}

export function AdminWorkspacesPage() {
  const { data = [] } = useQuery({ queryKey: ["admin-workspaces"], queryFn: getAdminWorkspaces });
  return (
    <AdminSection title="Workspaces" description="Tenant-level workspace records.">
      {data.map((workspace) => <AdminRow key={workspace.id} title={workspace.name} meta={workspace.slug} />)}
    </AdminSection>
  );
}

export function AdminEventsPage() {
  const { data = [] } = useQuery({ queryKey: ["admin-events"], queryFn: getAdminEvents });
  return (
    <AdminSection title="Events" description="Cross-workspace event visibility for platform support.">
      {data.map((event) => <AdminRow key={event.id} title={event.title} meta={`${event.status} / ${event.slug}`} />)}
    </AdminSection>
  );
}

export function AdminTemplatesPage() {
  const { data = [] } = useQuery({ queryKey: ["admin-templates"], queryFn: getAdminTemplates });
  return (
    <AdminSection title="Templates" description="Template catalog placeholder for content admins.">
      {data.map((template) => <AdminRow key={template.id} title={template.name} meta={template.styleTags.join(" / ")} />)}
    </AdminSection>
  );
}

export function AdminPlansPage() {
  const { data = [] } = useQuery({ queryKey: ["admin-plans"], queryFn: getAdminPlans });
  return (
    <AdminSection title="Plans" description="Mock package definitions ready to connect to subscriptions later.">
      {data.map((plan) => <AdminRow key={plan.id} title={plan.name} meta={plan.priceLabel} />)}
    </AdminSection>
  );
}

export function AdminSupportPage() {
  return (
    <AdminSection title="Support" description="Placeholder for workspace lookup, customer notes, and issue triage.">
      <AdminRow title="Manual support queue" meta="2 mocked open requests" />
    </AdminSection>
  );
}

export function AdminAuditLogsPage() {
  return (
    <AdminSection title="Audit logs" description="Placeholder for security-relevant platform and workspace actions.">
      <AdminRow title="event.published" meta="Maya Events Studio / mocked timestamp" />
      <AdminRow title="member.invited" meta="Maya Events Studio / mocked timestamp" />
    </AdminSection>
  );
}

function AdminSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Platform Admin</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-slate-600">{description}</p>
      </div>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function AdminMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function AdminRow({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{meta}</p>
    </div>
  );
}
