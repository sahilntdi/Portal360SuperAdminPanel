// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/ThemeProvider";
import { store } from "./store/store";
import { AppLayout } from "./components/AppLayout";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Users from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import WebsiteContent from "./pages/WebsiteContent";
import HelpSupport from "./pages/HelpSupport";
import Security from "./pages/Security";
import EmailTriggers from "./pages/EmailTriggers";
import AIAutomation from "./pages/AIAutomation";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";
import WebsiteQuery from "./pages/WebsiteQuery";
import OrganizationDetailView from "./components/organizations/OrganizationDetailView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on 401 errors
        if (error?.response?.status === 401) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="portal-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public route - no authentication required */}
              <Route path="/auth" element={<Login />} />
              
              {/* All protected routes */}
              <Route element={<ProtectedLayout />}>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/organizations" element={<Organizations />} />
                  <Route path="/organizations/:id" element={<OrganizationDetailView />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/website-content" element={<WebsiteContent />} />
                  <Route path="/help" element={<HelpSupport />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/email-triggers" element={<EmailTriggers />} />
                  <Route path="/ai-automation" element={<AIAutomation />} />
                  <Route path="/compliance" element={<Compliance />} />
                  <Route path="/website-queries" element={<WebsiteQuery />} />
                </Route>
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;