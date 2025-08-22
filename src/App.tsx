import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import NewCourse from "./pages/NewCourse";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import CreateImage from "./pages/CreateImage";
import CreateVideo from "./pages/CreateVideo";
import CreateScript from "./pages/CreateScript";
import AIVoice from "./pages/AIVoice";
import Templates from "./pages/Templates";
import SEOKeywords from "./pages/SEOKeywords";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/new-course" element={<NewCourse />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
            <Route path="/create-image" element={<CreateImage />} />
            <Route path="/create-video" element={<CreateVideo />} />
            <Route path="/create-script" element={<CreateScript />} />
            <Route path="/ai-voice" element={<AIVoice />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/seo-keywords" element={<SEOKeywords />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
