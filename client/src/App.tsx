import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Resumes from "@/pages/Resumes";
import FormHistory from "@/pages/FormHistory";
import ExtensionSettings from "@/pages/ExtensionSettings";
import ExtensionInstall from "@/pages/ExtensionInstall";
import Help from "@/pages/Help";
import Auth from "./pages/Auth";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={() => <Auth defaultMode="login" />} />
      <Route
        path="/register"
        component={() => <Auth defaultMode="register" />}
      />
      <Route path="/" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/resumes" component={Resumes} />
      <Route path="/form-history" component={FormHistory} />
      <Route path="/extension/settings" component={ExtensionSettings} />
      <Route path="/extension/install" component={ExtensionInstall} />
      <Route path="/help" component={Help} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
