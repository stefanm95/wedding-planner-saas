import { templates } from "./catalog";
import { mockEventDetails, mockEvents, mockRsvps, mockUsers, mockWorkspaceMembers, mockWorkspaces } from "./mockData";

export const mockDb = {
  users: [...mockUsers],
  workspaces: [...mockWorkspaces],
  workspaceMembers: [...mockWorkspaceMembers],
  events: [...mockEvents],
  eventDetails: [...mockEventDetails],
  rsvps: [...mockRsvps],
  templates: [...templates],
};

export const mockDelay = async () => new Promise((resolve) => window.setTimeout(resolve, 160));
