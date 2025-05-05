
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Branches from "./pages/Branches";
import TariffComparison from "./pages/TariffComparison";
import Events from "./pages/Events";
import Membership from "./pages/Membership";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminMembership from "./pages/admin/Membership";
import AdminUsers from "./pages/admin/Users";
import AdminAccounts from "./pages/admin/Accounts";
import AdminTicketDesigner from "./pages/admin/TicketDesigner";
import AdminMembershipCardDesigner from "./pages/admin/MembershipCardDesigner";
import MemberTickets from "./pages/member/Tickets";
import MemberEvents from "./pages/member/Events";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/tariff-comparison" element={<TariffComparison />} />
          <Route path="/events" element={<Events />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Member routes */}
          <Route path="/member/tickets" element={<MemberTickets />} />
          <Route path="/member/events" element={<MemberEvents />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="membership" element={<AdminMembership />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="accounts" element={<AdminAccounts />} />
            <Route path="ticket-designer" element={<AdminTicketDesigner />} />
            <Route path="membership-card-designer" element={<AdminMembershipCardDesigner />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
