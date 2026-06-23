import { Navigate, Route, Routes } from "react-router-dom";
import { AdminAuthLayout } from "../components/layout/AdminAuthLayout";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AppLayout } from "../components/layout/AppLayout";
import { AuthLayout } from "../components/layout/AuthLayout";
import { PublicLayout } from "../components/layout/PublicLayout";
import {
  AdminAuditLogsPage,
  AdminEventsPage,
  AdminOverviewPage,
  AdminPlansPage,
  AdminSupportPage,
  AdminTemplatesPage,
  AdminUsersPage,
  AdminWorkspacesPage,
} from "../features/admin/AdminPages";
import { AuthPage } from "../features/auth/AuthPages";
import { RequireAuth, RequirePlatformAdmin, RequireWorkspaceRole } from "../features/auth/routeGuards";
import {
  DashboardHomePage,
  EventDetailPage,
  EventsPage,
  PlaceholderAppPage,
  RsvpsPage,
} from "../features/dashboard/DashboardPages";
import { EventWizard } from "../features/events/EventWizard";
import { InvitationPage } from "../features/invitations/InvitationPage";
import { EventTypeLandingPage, HomePage, HowItWorksPage } from "../features/marketing/MarketingPages";
import { PricingPage } from "../features/pricing/PricingPage";
import { TemplatesPage } from "../features/templates/TemplatesPage";

export function App() {
  return (
    <Routes>
      <Route path="/invite/:slug" element={<InvitationPage />} />

      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<EventWizard entry="public" />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="templates/:eventType" element={<TemplatesPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="event-types" element={<EventTypeLandingPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="register" element={<AuthPage mode="register" />} />
        <Route path="set-password" element={<AuthPage mode="setPassword" />} />
      </Route>

      <Route element={<AdminAuthLayout />}>
        <Route path="/admin/login" element={<AuthPage mode="adminLogin" />} />
      </Route>

      <Route path="/app" element={<RequireAuth><AppLayout /></RequireAuth>}>
        <Route index element={<DashboardHomePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/new" element={<RequireWorkspaceRole allowedRoles={["workspaceOwner", "workspaceEditor"]}><EventWizard entry="app" /></RequireWorkspaceRole>} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        <Route path="events/:eventId/editor" element={<RequireWorkspaceRole allowedRoles={["workspaceOwner", "workspaceEditor"]}><PlaceholderAppPage title="Editor" /></RequireWorkspaceRole>} />
        <Route path="events/:eventId/rsvps" element={<RsvpsPage />} />
        <Route path="events/:eventId/guests" element={<PlaceholderAppPage title="Guests" />} />
        <Route path="events/:eventId/settings" element={<RequireWorkspaceRole allowedRoles={["workspaceOwner", "workspaceEditor"]}><PlaceholderAppPage title="Settings" /></RequireWorkspaceRole>} />
        <Route path="account" element={<PlaceholderAppPage title="Account" />} />
      </Route>

      <Route path="/admin" element={<RequirePlatformAdmin><AdminLayout /></RequirePlatformAdmin>}>
        <Route index element={<AdminOverviewPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="workspaces" element={<AdminWorkspacesPage />} />
        <Route path="events" element={<AdminEventsPage />} />
        <Route path="templates" element={<AdminTemplatesPage />} />
        <Route path="plans" element={<AdminPlansPage />} />
        <Route path="support" element={<AdminSupportPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
