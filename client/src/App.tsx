import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import CustomCursor from "@/components/CustomCursor";
import EasterEggGame from "@/components/EasterEggGame";
import { useAuthStore } from "./store/authStore";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/admin" />;
  }

  // Prevent unauthorized access to admin routes
  if (location.pathname.startsWith('/admin/') && !isAuthenticated) {
    return <Redirect to="/admin" />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <Router />
      <EasterEggGame />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;