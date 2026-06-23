import { Link, Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <header className="section flex h-20 items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-ink">Wedly</Link>
        <Link to="/" className="text-sm font-semibold text-stone-600 hover:text-ink">Back to homepage</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
