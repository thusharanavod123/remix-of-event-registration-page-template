import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { RecruitLayout } from "@/components/recruit/RecruitLayout";
import RecruitHome from "@/pages/recruit/RecruitHome";
import RecruitVacancies from "@/pages/recruit/RecruitVacancies";
import RecruitAbout from "@/pages/recruit/RecruitAbout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="app-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<RecruitLayout />}>
              <Route path="/" element={<RecruitHome />} />
              <Route path="/vacancies" element={<RecruitVacancies />} />
              <Route path="/about" element={<RecruitAbout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
