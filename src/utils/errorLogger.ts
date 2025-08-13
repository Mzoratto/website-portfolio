/**
 * Error logging utility for production error tracking
 */

export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  buildVersion?: string;
}

export interface ErrorLoggerConfig {
  apiEndpoint?: string;
  apiKey?: string;
  enableConsoleLog?: boolean;
  enableLocalStorage?: boolean;
  maxStoredErrors?: number;
  enableUserTracking?: boolean;
}

class ErrorLogger {
  private config: ErrorLoggerConfig;
  private sessionId: string;

  constructor(config: ErrorLoggerConfig = {}) {
    this.config = {
      enableConsoleLog: true,
      enableLocalStorage: true,
      maxStoredErrors: 50,
      enableUserTracking: false,
      ...config,
    };

    this.sessionId = this.generateSessionId();
    this.setupGlobalErrorHandlers();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupGlobalErrorHandlers(): void {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
      });
    });
  }

  public logError(errorInfo: Partial<ErrorInfo>): void {
    const fullErrorInfo: ErrorInfo = {
      message: 'Unknown error',
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      buildVersion: import.meta.env.VITE_BUILD_VERSION || 'unknown',
      ...errorInfo,
    };

    // Console logging
    if (this.config.enableConsoleLog) {
      console.error('Error logged:', fullErrorInfo);
    }

    // Local storage for offline support
    if (this.config.enableLocalStorage) {
      this.storeErrorLocally(fullErrorInfo);
    }

    // Send to remote logging service
    if (this.config.apiEndpoint) {
      this.sendErrorToService(fullErrorInfo);
    }
  }

  private storeErrorLocally(errorInfo: ErrorInfo): void {
    try {
      const stored = localStorage.getItem('error_logs');
      const errors: ErrorInfo[] = stored ? JSON.parse(stored) : [];
      
      errors.push(errorInfo);
      
      // Limit stored errors
      if (errors.length > (this.config.maxStoredErrors || 50)) {
        errors.splice(0, errors.length - (this.config.maxStoredErrors || 50));
      }
      
      localStorage.setItem('error_logs', JSON.stringify(errors));
    } catch (error) {
      console.warn('Failed to store error locally:', error);
    }
  }

  private async sendErrorToService(errorInfo: ErrorInfo): Promise<void> {
    if (!this.config.apiEndpoint) return;

    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify(errorInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.warn('Failed to send error to logging service:', error);
      // Store failed requests for retry
      this.storeFailedRequest(errorInfo);
    }
  }

  private storeFailedRequest(errorInfo: ErrorInfo): void {
    try {
      const stored = localStorage.getItem('failed_error_requests');
      const requests: ErrorInfo[] = stored ? JSON.parse(stored) : [];
      requests.push(errorInfo);
      localStorage.setItem('failed_error_requests', JSON.stringify(requests));
    } catch (error) {
      console.warn('Failed to store failed request:', error);
    }
  }

  public getStoredErrors(): ErrorInfo[] {
    try {
      const stored = localStorage.getItem('error_logs');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to retrieve stored errors:', error);
      return [];
    }
  }

  public clearStoredErrors(): void {
    try {
      localStorage.removeItem('error_logs');
      localStorage.removeItem('failed_error_requests');
    } catch (error) {
      console.warn('Failed to clear stored errors:', error);
    }
  }

  public retryFailedRequests(): void {
    if (!this.config.apiEndpoint) return;

    try {
      const stored = localStorage.getItem('failed_error_requests');
      if (!stored) return;

      const requests: ErrorInfo[] = JSON.parse(stored);
      requests.forEach(errorInfo => {
        this.sendErrorToService(errorInfo);
      });

      localStorage.removeItem('failed_error_requests');
    } catch (error) {
      console.warn('Failed to retry failed requests:', error);
    }
  }

  public setUserId(userId: string): void {
    if (this.config.enableUserTracking) {
      localStorage.setItem('error_logger_user_id', userId);
    }
  }

  public getUserId(): string | null {
    if (!this.config.enableUserTracking) return null;
    return localStorage.getItem('error_logger_user_id');
  }
}

// Create singleton instance
const errorLogger = new ErrorLogger({
  enableConsoleLog: import.meta.env.DEV,
  enableLocalStorage: true,
  maxStoredErrors: 100,
  // In production, you would set these:
  // apiEndpoint: 'https://your-logging-service.com/api/errors',
  // apiKey: 'your-api-key',
});

export default errorLogger;

// Convenience functions
export const logError = (error: Error | string, additionalInfo?: Partial<ErrorInfo>) => {
  const errorInfo: Partial<ErrorInfo> = {
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'object' ? error.stack : undefined,
    ...additionalInfo,
  };
  
  errorLogger.logError(errorInfo);
};

export const logComponentError = (
  error: Error,
  componentStack: string,
  componentName: string
) => {
  errorLogger.logError({
    message: `Component Error in ${componentName}: ${error.message}`,
    stack: error.stack,
    componentStack,
  });
};
