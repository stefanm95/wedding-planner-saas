import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";

const adminLinks = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/workspaces", label: "Workspaces" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/templates", label: "Templates" },
  { to: "/admin/plans", label: "Plans" },
  { to: "/admin/support", label: "Support" },
  { to: "/admin/audit-logs", label: "Audit logs" },
];

export function AdminLayout() {
  const { adminUser, platformRole, adminLogout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-slate-950 p-6 text-white lg:block">
        <Link to="/admin" className="text-2xl font-bold">Wedly Admin</Link>
        <p className="mt-2 text-sm text-slate-400">Internal platform CRM</p>
        <nav className="mt-10 grid gap-1">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-20 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Platform Admin</p>
              <h1 className="text-xl font-semibold">Internal operations and support</h1>
              <p className="mt-1 text-sm text-slate-500">{adminUser?.email} / {platformRole ?? "no platform role"}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold" onClick={adminLogout}>
                Admin logout
              </button>
              <Link to="/app" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Workspace app</Link>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:hidden">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-slate-950 text-white" : "bg-white text-slate-600"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="px-4 py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
