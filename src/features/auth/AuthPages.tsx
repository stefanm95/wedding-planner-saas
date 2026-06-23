import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./authStore";

type AuthPageProps = {
  mode: "login" | "register";
};

export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("owner@example.com");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login();
    navigate("/app");
  }

  const isLogin = mode === "login";

  return (
    <div className="section grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">Mock auth</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {isLogin ? "Log in to manage your invitations." : "Create your invitation workspace."}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
          Authentication is mocked for milestone one. The screens are wired so Firebase or Supabase can replace this later through the service layer.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white bg-white p-6 shadow-soft sm:p-8">
        <label className="label" htmlFor="email">Email</label>
        <input id="email" className="field mt-2" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        <button className="btn-primary mt-6 w-full" type="submit">
          {isLogin ? "Log in" : "Create account"}
        </button>
        <p className="mt-5 text-center text-sm text-stone-500">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <Link className="font-semibold text-ink" to={isLogin ? "/register" : "/login"}>
            {isLogin ? "Register" : "Log in"}
          </Link>
        </p>
      </form>
    </div>
  );
}
