"use client"

import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-fuchsia-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 max-w-md w-full text-center">
            <div className="text-6xl mb-4">😱</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              Aunty ji encountered an error while preparing your meme. Don't worry, let's try again!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
