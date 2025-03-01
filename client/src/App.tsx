import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import CustomCursor from "@/components/CustomCursor";
import EasterEggGame from "@/components/EasterEggGame";
import { useAuthStore } from "./store/authStore";
import { useEffect, useState } from "react";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/admin" />;
  }

  // Prevent unauthorized access to admin routes
  if (currentPath.startsWith('/admin/') && !isAuthenticated) {
    return <Redirect to="/admin" />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <HelmetProvider>
      <Switch>
        {/* Home Page */}
        <Route path="/">
          <>
            <Helmet>
              <title>Sambit Maity | Portfolio</title>
              <meta name="description" content="Explore the portfolio of Sambit Maity, a passionate full-stack developer." />
              <meta name="keywords" content="Sambit Maity, Portfolio, Web Developer, React, Full-stack Developer" />
              <meta property="og:title" content="Sambit Maity | Portfolio" />
              <meta property="og:description" content="Check out my latest projects and work." />
              <meta property="og:url" content="https://sambit-maity.netlify.app/" />
              <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Home />
          </>
        </Route>

        {/* Admin Login Page */}
        <Route path="/admin">
          <>
            <Helmet>
              <title>Admin Login | Sambit Maity</title>
              <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <AdminLogin />
          </>
        </Route>

        {/* Admin Dashboard (Protected Route) */}
        <Route path="/admin/dashboard">
          <PrivateRoute>
            <>
              <Helmet>
                <title>Admin Dashboard | Sambit Maity</title>
                <meta name="robots" content="noindex, nofollow" />
              </Helmet>
              <AdminDashboard />
            </>
          </PrivateRoute>
        </Route>

        {/* 404 Page */}
        <Route>
          <>
            <Helmet>
              <title>404 Not Found | Sambit Maity</title>
            </Helmet>
            <NotFound />
          </>
        </Route>
      </Switch>
    </HelmetProvider>
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
