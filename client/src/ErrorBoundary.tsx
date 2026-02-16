import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 600 }}>
          <h1 style={{ color: "#c00" }}>Something went wrong</h1>
          <pre style={{ background: "#f5f5f5", padding: 16, overflow: "auto", fontSize: 14 }}>
            {this.state.error.message}
          </pre>
          <p>Check the browser console (F12) for more details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
