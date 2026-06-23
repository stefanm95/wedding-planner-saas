import { mockDelay } from "../data/mockDb";
import { mockUser, mockWorkspace } from "../data/mockData";
import type { AuthUser, PlatformRole, Workspace, WorkspaceRole } from "../types/domain";

export type MockSession = {
  currentUser: AuthUser | null;
  currentWorkspace: Workspace | null;
  workspaceRole: WorkspaceRole | null;
  platformRole: PlatformRole | null;
  adminUser: AuthUser | null;
};

let mockSession: MockSession = {
  currentUser: null,
  currentWorkspace: null,
  workspaceRole: null,
  platformRole: null,
  adminUser: null,
};

export async function getMockSession() {
  await mockDelay();
  return mockSession;
}

export async function mockLogin() {
  await mockDelay();
  mockSession = {
    currentUser: mockUser,
      currentWorkspace: mockWorkspace,
      workspaceRole: "workspaceOwner",
      platformRole: null,
      adminUser: mockSession.adminUser,
    };
  return mockSession;
}

export async function mockLogout() {
  await mockDelay();
  mockSession = {
    currentUser: null,
    currentWorkspace: null,
    workspaceRole: null,
    platformRole: mockSession.platformRole,
    adminUser: mockSession.adminUser,
  };
  return mockSession;
}

export async function mockAdminLogin() {
  await mockDelay();
  mockSession = {
    ...mockSession,
    adminUser: mockUser,
    platformRole: "platformAdmin",
  };
  return mockSession;
}

export async function mockAdminLogout() {
  await mockDelay();
  mockSession = {
    ...mockSession,
    adminUser: null,
    platformRole: null,
  };
  return mockSession;
}
