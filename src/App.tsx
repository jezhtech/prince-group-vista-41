import { SpeedInsights } from "@vercel/speed-insights/react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import EventBanner from "./components/EventBanner";
import { AuthProvider } from "./hooks/useAuth";
import NotFound from "./pages/public/NotFound";

import Home from "@/pages/public/Home";
import Services from "@/pages/public/Services";
import DocumentationServices from "@/pages/public/DocumentationServices";
import NewLoanServices from "@/pages/public/NewLoanServices";
import Branches from "@/pages/public/Branches";
import TariffComparison from "@/pages/public/TariffComparison";
import Events from "@/pages/public/Events";
import EventTickets from "@/pages/public/EventTickets";
import EventAttractions from "@/pages/public/EventAttractions";
import Membership from "@/pages/public/Membership";
import About from "@/pages/public/About";
import Terms from "@/pages/public/Terms";
import Privacy from "@/pages/public/Privacy";
import Contact from "@/pages/public/Contact";
import Login from "@/pages/public/auth/Login";
import Register from "@/pages/public/auth/Register";
import ForgotPassword from "@/pages/public/auth/ForgotPassword";
import PasswordResetSent from "@/pages/public/auth/PasswordResetSent";
import ResetPassword from "@/pages/public/auth/ResetPassword";
import ReferralLandingPage from "@/pages/public/ReferralLandingPage";

import MemberDashboard from "@/pages/user/Dashboard";
import MemberTickets from "@/pages/user/Tickets";
import MemberEvents from "@/pages/user/Events";
import {
  AdminProtectedRoute,
  UserProtectedRoute,
} from "./components/ProtectedRoute";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminEventAnalytics from "@/pages/admin/event-analytics";
import AdminTickets from "@/pages/admin/tickets";
import AdminMembership from "@/pages/admin/Membership";
import AdminUsers from "@/pages/admin/Users";
import AdminRevenue from "@/pages/admin/revenue";
import AdminReferrals from "@/pages/admin/Referrals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <EventBanner position="fixed" />
            <Routes>
              <Route path="/">
                <Route path="/" element={<Events />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/services/documentation"
                  element={<DocumentationServices />}
                />
                <Route
                  path="/documentation-services"
                  element={<DocumentationServices />}
                />
                <Route path="/services/loans" element={<NewLoanServices />} />
                <Route path="/loan-services" element={<NewLoanServices />} />
                <Route path="/branches" element={<Branches />} />
                <Route
                  path="/tariff-comparison"
                  element={<TariffComparison />}
                />
                <Route path="/events" element={<Events />} />,
                <Route path="/events/tickets" element={<EventTickets />} />
                <Route
                  path="/events/attractions"
                  element={<EventAttractions />}
                />
                <Route path="/membership" element={<Membership />} />
                <Route path="/about" element={<About />} />,
                <Route path="/terms" element={<Terms />} />,
                <Route path="/privacy" element={<Privacy />} />,
                <Route path="/contact" element={<Contact />} />, // Auth routes
                - prevent logged-in users from accessing
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/complete" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/password-reset-sent"
                  element={<PasswordResetSent />}
                />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/events/concert/ref/:refCode"
                  element={<ReferralLandingPage />}
                />
              </Route>

              {/* User Routes - require authentication */}
              <Route path="/member" element={<UserProtectedRoute />}>
                <Route path="/member/dashboard" element={<MemberDashboard />} />
                <Route path="/member/tickets" element={<MemberTickets />} />
                <Route path="/member/events" element={<MemberEvents />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="/admin" element={<AdminProtectedRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route
                  path="event-analytics"
                  element={<AdminEventAnalytics />}
                />
                <Route path="tickets" element={<AdminTickets />} />
                <Route path="referrals" element={<AdminReferrals />} />
                <Route path="membership" element={<AdminMembership />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="revenue" element={<AdminRevenue />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
