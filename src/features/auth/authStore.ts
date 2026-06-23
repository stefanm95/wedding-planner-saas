import { create } from "zustand";
import { mockUser, mockWorkspace } from "../../data/mockData";
import type { AuthUser, PlatformRole, Workspace, WorkspaceRole } from "../../types/domain";

type AuthState = {
  currentUser: AuthUser | null;
  adminUser: AuthUser | null;
  currentWorkspace: Workspace | null;
  workspaceRole: WorkspaceRole | null;
  platformRole: PlatformRole | null;
  login: () => void;
  adminLogin: () => void;
  logout: () => void;
  adminLogout: () => void;
  setMockWorkspaceRole: (role: WorkspaceRole) => void;
  setMockPlatformAdmin: (enabled: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  adminUser: null,
  currentWorkspace: null,
  workspaceRole: null,
  platformRole: null,
  login: () =>
    set({
      currentUser: mockUser,
      currentWorkspace: mockWorkspace,
      workspaceRole: "workspaceOwner",
    }),
  adminLogin: () =>
    set({
      adminUser: mockUser,
      platformRole: "platformAdmin",
    }),
  logout: () =>
    set({
      currentUser: null,
      currentWorkspace: null,
      workspaceRole: null,
    }),
  adminLogout: () =>
    set({
      adminUser: null,
      platformRole: null,
    }),
  setMockWorkspaceRole: (role) => set({ workspaceRole: role }),
  setMockPlatformAdmin: (enabled) => set({ adminUser: enabled ? mockUser : null, platformRole: enabled ? "platformAdmin" : null }),
}));
