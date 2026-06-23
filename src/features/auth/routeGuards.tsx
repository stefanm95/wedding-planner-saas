import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./authStore";
import type { WorkspaceRole } from "../../types/domain";

type GuardProps = {
  children: ReactNode;
};

type WorkspaceGuardProps = GuardProps & {
  allowedRoles: WorkspaceRole[];
};

export function RequireAuth({ children }: GuardProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export function RequireWorkspaceRole({ allowedRoles, children }: WorkspaceGuardProps) {
  const workspaceRole = useAuthStore((state) => state.workspaceRole);

  if (!workspaceRole || !allowedRoles.includes(workspaceRole)) {
    return <Navigate to="/app" replace />;
  }

  return children;
}

export function RequirePlatformAdmin({ children }: GuardProps) {
  const adminUser = useAuthStore((state) => state.adminUser);
  const platformRole = useAuthStore((state) => state.platformRole);
  const location = useLocation();

  if (!adminUser || platformRole !== "platformAdmin") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
