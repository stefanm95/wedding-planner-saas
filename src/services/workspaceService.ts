import { mockDb, mockDelay } from "../data/mockDb";

export async function getCurrentWorkspace() {
  await mockDelay();
  return mockDb.workspaces[0] ?? null;
}

export async function getWorkspaceMembers(workspaceId: string) {
  await mockDelay();
  return mockDb.workspaceMembers.filter((member) => member.workspaceId === workspaceId);
}
