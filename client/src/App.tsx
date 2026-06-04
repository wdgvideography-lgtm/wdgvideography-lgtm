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

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const SERVICES_ID = "services";

    const decodeHash = (hash: string) => {
      if (!hash || hash === "#") return "";
      try {
        return decodeURIComponent(hash.replace(/^#/, ""));
      } catch {
        return hash.replace(/^#/, "");
      }
    };

    const getTarget = (hash: string) => {
      const id = decodeHash(hash);
      return id ? document.getElementById(id) : null;
    };

    const markServicesOffset = () => {
      const services = document.getElementById(SERVICES_ID);
      if (!services) return;
      (services as HTMLElement).style.scrollMarginTop = "96px";
    };

    const revealServices = () => {
      const services = document.getElementById(SERVICES_ID);
      if (!services) return;

      const section = services as HTMLElement;
      section.style.opacity = "1";
      section.style.visibility = "visible";
      section.style.filter = "none";

      const nodes = section.querySelectorAll<HTMLElement>(
        "header, h1, h2, h3, p, .section-header, .section-heading, .title-wrap, .copy-wrap, [data-animate], [data-reveal], .gsap-reveal"
      );

      nodes.forEach((node) => {
        const cs = window.getComputedStyle(node);

        if (parseFloat(cs.opacity) === 0) {
          node.style.opacity = "1";
        }

        if (cs.visibility === "hidden") {
          node.style.visibility = "visible";
        }

        if (cs.filter && cs.filter !== "none") {
          node.style.filter = "none";
        }
      });
    };

    const scrollToHash = (hash: string, smooth = true) => {
      const target = getTarget(hash) as HTMLElement | null;
      if (!target) return false;

      target.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
        inline: "nearest",
      });

      if (target.id === SERVICES_ID) {
        revealServices();
      }

      return true;
    };

    const handleClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const link = el?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const path = href.slice(0, hashIndex);
      const hash = href.slice(hashIndex);

      const samePage =
        path === "" ||
        path === "/" ||
        path === location.pathname ||
        path === location.origin + location.pathname;

      if (!samePage) return;

      const target = getTarget(hash);
      if (!target) return;

      e.preventDefault();

      try {
        history.replaceState(null, "", hash);
      } catch {}

      markServicesOffset();
      scrollToHash(hash, true);
    };

    const handleHashChange = () => {
      markServicesOffset();
      scrollToHash(location.hash, true);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("hashchange", handleHashChange);

    markServicesOffset();
    revealServices();

    const bootTimer = window.setInterval(() => {
      revealServices();
    }, 250);

    let retryTimer: number | undefined;

    window.requestAnimationFrame(() => {
      if (location.hash) {
        let tries = 0;
        retryTimer = window.setInterval(() => {
          const done = scrollToHash(location.hash, true);
          tries += 1;
          if (done || tries > 60) {
            window.clearInterval(retryTimer);
          }
        }, 120);
      }
    });

    const stopBootTimer = window.setTimeout(() => {
      window.clearInterval(bootTimer);
    }, 10000);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("hashchange", handleHashChange);
      window.clearInterval(bootTimer);
      if (retryTimer) window.clearInterval(retryTimer);
      window.clearTimeout(stopBootTimer);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
