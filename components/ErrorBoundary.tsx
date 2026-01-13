
import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Fixed class component definition with generic types for Props and State
class ErrorBoundary extends React.Component<Props, State> {
  // Use public for state and props access
  public state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 text-center font-sans">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
            <AlertTriangle size={40} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Systemfel</h1>
          <p className="text-white/60 mb-8 max-w-md">
            Ett kritiskt fel uppstod i applikationen. Försök att ladda om sidan.
          </p>
          <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-8 max-w-lg w-full overflow-auto text-left">
            <code className="text-xs text-red-300 font-mono break-all">
                {this.state.error?.toString()}
            </code>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-[#FFD200] transition-colors"
          >
            <RefreshCw size={18} />
            Starta om
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;