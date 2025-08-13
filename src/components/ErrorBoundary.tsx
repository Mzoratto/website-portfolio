import React, { Component, ReactNode } from 'react';
import { ErrorBoundaryState } from '../types';
import { logComponentError } from '../utils/errorLogger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 * Implements WCAG 2.1 AA accessibility standards
 */
class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // Log to error reporting service
    logComponentError(error, errorInfo.componentStack, 'ErrorBoundary');

    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="error-boundary"
          role="alert"
          aria-labelledby="error-title"
          aria-describedby="error-description"
        >
          <div className="container">
            <div className="error-content">
              <h1 id="error-title" className="error-title">
                Oops! Something went wrong
              </h1>
              <p id="error-description" className="error-description">
                We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="error-details">
                  <summary>Error Details (Development Only)</summary>
                  <pre className="error-stack">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="error-actions">
                <button 
                  onClick={this.handleReload}
                  className="btn btn-primary"
                  aria-label="Reload the current page"
                >
                  Reload Page
                </button>
                <button 
                  onClick={this.handleGoHome}
                  className="btn btn-secondary"
                  aria-label="Go to homepage"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>

          <style>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: var(--spacing-lg);
              background-color: var(--color-background);
            }

            .error-content {
              text-align: center;
              max-width: 600px;
            }

            .error-title {
              font-size: 2rem;
              font-weight: 700;
              color: var(--color-text);
              margin-bottom: var(--spacing-lg);
            }

            .error-description {
              font-size: 1.125rem;
              color: var(--color-text-light);
              margin-bottom: var(--spacing-xl);
              line-height: 1.6;
            }

            .error-details {
              text-align: left;
              margin-bottom: var(--spacing-xl);
              padding: var(--spacing-md);
              background-color: var(--color-surface);
              border-radius: var(--radius-md);
              border: 1px solid var(--color-border);
            }

            .error-details summary {
              cursor: pointer;
              font-weight: 600;
              margin-bottom: var(--spacing-sm);
            }

            .error-stack {
              font-family: var(--font-family-mono);
              font-size: 0.875rem;
              white-space: pre-wrap;
              overflow-x: auto;
              color: var(--color-text);
            }

            .error-actions {
              display: flex;
              gap: var(--spacing-md);
              justify-content: center;
              flex-wrap: wrap;
            }

            @media (max-width: 768px) {
              .error-title {
                font-size: 1.5rem;
              }

              .error-description {
                font-size: 1rem;
              }

              .error-actions {
                flex-direction: column;
                align-items: center;
              }

              .error-actions .btn {
                width: 100%;
                max-width: 200px;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
