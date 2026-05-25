import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** If true, renders nothing instead of the error UI when a child crashes */
  silent?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Always log to console — safe, not shown to users, critical for debugging
    console.error("[WDG ErrorBoundary]", error.message, "\n", error.stack, "\n", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.silent) return null;

      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-md p-8 text-center">
            <AlertTriangle size={48} className="text-destructive mb-6 flex-shrink-0" />
            <h2 className="text-xl font-display text-foreground mb-3">Something went wrong</h2>
            <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
              We had a small hiccup. Try reloading the page — if it keeps
              happening, get in touch at wdg.videography@gmail.com
            </p>
            <button
              onClick={() => window.location.reload()}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-sm",
                "bg-gold text-primary-foreground font-body font-semibold text-sm tracking-wide",
                "hover:bg-gold-light transition-all duration-300"
              )}
            >
              <RotateCcw size={16} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
