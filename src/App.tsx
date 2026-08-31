import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { RecruitLayout } from "@/components/recruit/RecruitLayout";
import { AdminOnly } from "@/components/recruit/AdminOnly";
import RecruitHome from "@/pages/recruit/RecruitHome";
import RecruitVacancies from "@/pages/recruit/RecruitVacancies";
import RecruitAbout from "@/pages/recruit/RecruitAbout";
import AdminPanel from "@/pages/admin/AdminPanel";
import AdminClaim from "@/pages/admin/AdminClaim";
import Auth from "@/pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="app-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/admin"
                element={
                  <AdminOnly>
                    <AdminPanel />
                  </AdminOnly>
                }
              />
              <Route path="/admin/claim" element={<AdminClaim />} />
              <Route element={<RecruitLayout />}>
                <Route path="/" element={<RecruitHome />} />
                <Route path="/vacancies" element={<RecruitVacancies />} />
                <Route path="/about" element={<RecruitAbout />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
