import { Link, Outlet } from "react-router-dom";

export function AdminAuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold">Wedly</Link>
        <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white">Customer login</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
