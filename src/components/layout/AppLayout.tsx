import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";

const appLinks = [
  { to: "/app", label: "Overview" },
  { to: "/app/events", label: "Events" },
  { to: "/app/events/new", label: "Create" },
  { to: "/app/account", label: "Account" },
];

export function AppLayout() {
  const { currentUser, currentWorkspace, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#f8f1ec]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/70 bg-white/85 p-6 backdrop-blur lg:block">
        <Link to="/app" className="text-2xl font-bold text-ink">Wedly</Link>
        <p className="mt-2 text-sm text-stone-500">{currentWorkspace?.name ?? "No workspace"}</p>
        <nav className="mt-10 grid gap-2">
          {appLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/app"}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-ink text-white" : "text-stone-600 hover:bg-blush hover:text-ink"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-white/70 bg-[#f8f1ec]/90 backdrop-blur">
          <div className="flex min-h-20 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">My event invitation workspace</p>
              <h1 className="text-xl font-semibold text-ink">
                {currentWorkspace?.name ?? "Workspace"}{currentUser ? ` / ${currentUser.displayName}` : ""}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/" className="btn-secondary">Homepage</Link>
              <button type="button" onClick={logout} className="btn-secondary">Mock logout</button>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:hidden">
            {appLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/app"}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-ink text-white" : "bg-white text-stone-600"}`
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
