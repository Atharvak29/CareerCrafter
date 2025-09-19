import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CareerDiscovery from "./pages/CareerDiscovery";
import CareerMatching from "./pages/CareerMatching";
import AICareerMap from "./pages/AICareerMap";
import SkillEvolution from "./pages/SkillEvolution";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-discovery" element={<CareerDiscovery />} />
          <Route path="/career-matching" element={<CareerMatching />} />
          <Route path="/career-map" element={<AICareerMap />} />
          <Route path="/skill-evolution" element={<SkillEvolution />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
