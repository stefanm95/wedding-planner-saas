import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { PublicLayout } from "../components/layout/PublicLayout";
import { AuthPage } from "../features/auth/AuthPages";
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
        <Route path="pricing" element={<PricingPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="templates/:eventType" element={<TemplatesPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="event-types" element={<EventTypeLandingPage />} />
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="register" element={<AuthPage mode="register" />} />
      </Route>
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<DashboardHomePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/new" element={<EventWizard />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        <Route path="events/:eventId/editor" element={<PlaceholderAppPage title="Editor" />} />
        <Route path="events/:eventId/rsvps" element={<RsvpsPage />} />
        <Route path="events/:eventId/guests" element={<PlaceholderAppPage title="Guests" />} />
        <Route path="events/:eventId/settings" element={<PlaceholderAppPage title="Settings" />} />
        <Route path="account" element={<PlaceholderAppPage title="Account" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
