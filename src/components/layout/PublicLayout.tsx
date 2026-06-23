import { Link, NavLink, Outlet } from "react-router-dom";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/event-types", label: "Event types" },
  { to: "/templates", label: "Templates" },
  { to: "/pricing", label: "Pricing" },
];

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-[#fffaf7]/90 backdrop-blur">
        <nav className="section flex h-20 items-center justify-between gap-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-ink">Wedly</Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
            {publicLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => (isActive ? "text-ink" : "hover:text-ink")}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden text-sm font-semibold text-stone-700 sm:inline">Login</Link>
            <Link to="/create" className="btn-primary">Start invitation</Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-stone-200 bg-white">
        <div className="section flex flex-col gap-4 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Wedly creates digital invitations for life events, private celebrations, and meaningful gatherings.</p>
          <p>Payments, QR codes, and exports are prepared for later milestones.</p>
        </div>
      </footer>
    </div>
  );
}
