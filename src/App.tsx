import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GradientGenerator from "./pages/GradientGenerator";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import ColorPicker from "./pages/ColorPicker";
import ImagePicker from "./pages/ImagePicker";
import ContrastChecker from "./pages/ContrastChecker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/palette" element={<Index />} />
          <Route path="/gradient" element={<GradientGenerator />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/image-picker" element={<ImagePicker />} />
          <Route path="/contrast" element={<ContrastChecker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
