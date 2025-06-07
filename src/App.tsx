import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import EventPromoPopup from "./components/EventPromoPopup";
import EventBanner from "./components/EventBanner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import DocumentationServices from "./pages/DocumentationServices";
import LoanServices from "./pages/LoanServices";
import NewLoanServices from "./pages/NewLoanServices";
import Branches from "./pages/Branches";
import TariffComparison from "./pages/TariffComparison";
import Events from "./pages/Events";
import EventTickets from "./pages/EventTickets";
import EventAttractions from "./pages/EventAttractions";
import Membership from "./pages/Membership";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetSent from "./pages/PasswordResetSent";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEventAnalytics from "./pages/admin/event-analytics";
import AdminTickets from "./pages/admin/tickets";
import AdminMembership from "./pages/admin/Membership";
import AdminUsers from "./pages/admin/Users";
import AdminRevenue from "./pages/admin/revenue";
import AdminReferrals from "./pages/admin/Referrals";
import AdminAccounts from "./pages/admin/Accounts";
import AdminTicketDesigner from "./pages/admin/TicketDesigner";
import AdminMembershipCardDesigner from "./pages/admin/MembershipCardDesigner";
import MemberDashboard from "./pages/member/Dashboard";
import MemberTickets from "./pages/member/Tickets";
import MemberEvents from "./pages/member/Events";
import ReferralLandingPage from "./pages/ReferralLandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          
          <EventBanner position="fixed" />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/documentation" element={<DocumentationServices />} />
            <Route path="/documentation-services" element={<DocumentationServices />} />
            <Route path="/services/loans" element={<NewLoanServices />} />
            <Route path="/loan-services" element={<NewLoanServices />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/tariff-comparison" element={<TariffComparison />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/tickets" element={<EventTickets />} />
            <Route path="/events/attractions" element={<EventAttractions />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset-sent" element={<PasswordResetSent />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Referral landing pages */}
            <Route path="/events/concert/ref/:refCode" element={<ReferralLandingPage />} />
            
            {/* Member routes */}
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/tickets" element={<MemberTickets />} />
            <Route path="/member/events" element={<MemberEvents />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="event-analytics" element={<AdminEventAnalytics />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="referrals" element={<AdminReferrals />} />
              <Route path="membership" element={<AdminMembership />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="revenue" element={<AdminRevenue />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
