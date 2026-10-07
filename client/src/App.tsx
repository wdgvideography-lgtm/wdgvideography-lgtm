import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import AppDevelopment from "./pages/AppDevelopment";
import ServicePage from "./pages/ServicePage";
import { servicePages } from "./data/servicePages";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/app-development"} component={AppDevelopment} />
      {servicePages.map((p) => (
        <Route key={p.slug} path={`/${p.slug}`}>{() => <ServicePage slug={p.slug} />}</Route>
      ))}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Smooth-scroll to in-page anchors (/#services etc.), including on first load.
  useEffect(() => {
    const go = (hash: string, smooth = true) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const el = id ? document.getElementById(id) : null;
      if (!el) return false;
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      return true;
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const i = href.indexOf("#");
      const path = href.slice(0, i);
      if (path && path !== "/" && path !== location.pathname) return;
      if (path === "/" && location.pathname !== "/") return;
      if (go(href.slice(i))) { e.preventDefault(); history.replaceState(null, "", href.slice(i)); }
    };
    document.addEventListener("click", onClick, true);
    if (location.hash) { let n = 0; const t = window.setInterval(() => { if (go(location.hash, false) || ++n > 40) window.clearInterval(t); }, 100); }
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
