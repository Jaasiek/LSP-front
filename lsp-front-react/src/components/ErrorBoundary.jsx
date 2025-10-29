import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 flex items-center justify-center p-4">
          <div className="bg-slate-800/50 border border-red-500/50 rounded-lg p-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Coś poszło nie tak</h1>
            <p className="text-slate-300 mb-4">
              Aplikacja napotkała błąd, ale nie przejmuj się - możesz spróbować odświeżyć stronę.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Odśwież stronę
            </button>
            {this.state.error && (
              <details className="mt-4">
                <summary className="text-slate-400 cursor-pointer mb-2">Szczegóły techniczne</summary>
                <pre className="text-xs text-red-400 bg-slate-900 p-4 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

