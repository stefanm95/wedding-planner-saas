import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./authStore";

type AuthPageProps = {
  mode: "login" | "register" | "setPassword" | "adminLogin";
};

export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const adminLogin = useAuthStore((state) => state.adminLogin);
  const [email, setEmail] = useState("owner@example.com");
  const [password, setPassword] = useState("password");
  const [emailSent, setEmailSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "register") {
      login();
      setEmailSent(true);
      return;
    }
    if (mode === "setPassword") {
      login();
      navigate("/app");
      return;
    }
    if (mode === "adminLogin") {
      adminLogin();
      navigate("/admin");
      return;
    }
    login();
    navigate("/app");
  }

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isSetPassword = mode === "setPassword";
  const isAdmin = mode === "adminLogin";

  if (isAdmin) {
    return (
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Internal access only</p>
          <h1 className="mt-4 text-3xl font-bold text-white">Platform Admin Login</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Mocked staff authentication for the internal CRM and support console.</p>
          <label className="mt-6 grid gap-2">
            <span className="text-sm font-semibold text-slate-200">Email or username</span>
            <input className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-white" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="mt-4 grid gap-2">
            <span className="text-sm font-semibold text-slate-200">Password</span>
            <input className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-white" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950" type="submit">Access admin CRM</button>
        </form>
      </div>
    );
  }

  return (
    <div className="section grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">Event workspace access</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {isLogin ? "Access your event workspace." : isSetPassword ? "Set your password." : "Start your invitation."}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
          {isRegister
            ? "Create a customer account with email and password. The main invitation flow asks for this only after your invitation details are ready."
            : isSetPassword
              ? "This mocked setup step keeps a route ready for future account recovery or onboarding."
              : "Continue to your workspace to manage invitations, RSVP responses, guests, and public links."}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white bg-white p-6 shadow-soft sm:p-8">
        <label className="label" htmlFor="email">Email</label>
        <input id="email" className="field mt-2" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        <label className="label mt-4 block" htmlFor="password">Password</label>
        <input id="password" className="field mt-2" value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
        <button className="btn-primary mt-6 w-full" type="submit">
          {isLogin ? "Continue to workspace" : isSetPassword ? "Set password and continue" : "Create account"}
        </button>
        {emailSent ? (
          <div className="mt-5 rounded-2xl bg-sage p-4 text-sm font-semibold text-ink">
            Mock account created. You can now <Link className="underline" to="/app">continue to workspace</Link>.
          </div>
        ) : null}
        <p className="mt-5 text-center text-sm text-stone-500">
          {isLogin ? "Starting a new invitation?" : "Already have workspace access?"}{" "}
          <Link className="font-semibold text-ink" to={isLogin ? "/create" : "/login"}>
            {isLogin ? "Start invitation" : "Log in"}
          </Link>
        </p>
      </form>
    </div>
  );
}
