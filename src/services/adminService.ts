import { packagePlans } from "../data/catalog";
import { mockDb, mockDelay } from "../data/mockDb";
import type { AdminSummary } from "../types/domain";

export async function getAdminSummary(): Promise<AdminSummary> {
  await mockDelay();
  return {
    users: mockDb.users.length,
    workspaces: mockDb.workspaces.length,
    events: mockDb.events.length,
    templates: mockDb.templates.length,
    openSupportTickets: 2,
    auditLogEntries: 8,
  };
}

export async function getAdminUsers() {
  await mockDelay();
  return mockDb.users;
}

export async function getAdminWorkspaces() {
  await mockDelay();
  return mockDb.workspaces;
}

export async function getAdminEvents() {
  await mockDelay();
  return mockDb.events;
}

export async function getAdminTemplates() {
  await mockDelay();
  return mockDb.templates;
}

export async function getAdminPlans() {
  await mockDelay();
  return packagePlans;
}
