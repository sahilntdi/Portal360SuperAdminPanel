import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Users from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import WebsiteContent from "./pages/WebsiteContent";
import HelpSupport from "./pages/HelpSupport";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import EmailTriggers from "./pages/EmailTriggers";
import AIAutomation from "./pages/AIAutomation";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="portal-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="organizations" element={<Organizations />} />
              <Route path="users" element={<Users />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="features" element={<Features />} />
              <Route path="website-content" element={<WebsiteContent />} />
              <Route path="help" element={<HelpSupport />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="security" element={<Security />} />
              <Route path="email-triggers" element={<EmailTriggers />} />
              <Route path="ai-automation" element={<AIAutomation />} />
              <Route path="compliance" element={<Compliance />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
