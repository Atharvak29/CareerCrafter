import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Wizard } from "@/components/Wizard";
import Index from "./pages/Index";
import CareerDiscovery from "./pages/CareerDiscovery";
import CareerMatching from "./pages/CareerMatching";
import AICareerMap from "./pages/AICareerMap";
import Congratulations from "./pages/Congratulations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Wizard />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-discovery" element={<CareerDiscovery />} />
          <Route path="/career-matching" element={<CareerMatching />} />
          <Route path="/ai-career-map" element={<AICareerMap />} />
          <Route path="/congratulations" element={<Congratulations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;