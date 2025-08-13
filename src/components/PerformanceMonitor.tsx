import { useEffect } from 'react';

/**
 * Performance monitoring component for Core Web Vitals
 * Tracks and reports performance metrics in development
 */
const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    // Web Vitals monitoring
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('🎯 LCP:', Math.round(lastEntry.startTime), 'ms');
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              console.log('⚡ FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
            });
          });
          fidObserver.observe({ type: 'first-input', buffered: true });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                console.log('📐 CLS:', Math.round(clsValue * 1000) / 1000);
              }
            });
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });

          // First Contentful Paint (FCP)
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              console.log('🎨 FCP:', Math.round(entry.startTime), 'ms');
            });
          });
          fcpObserver.observe({ type: 'paint', buffered: true });

        } catch (error) {
          console.warn('Performance monitoring not supported:', error);
        }
      }
    };

    // Navigation timing
    const logNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          console.group('📊 Navigation Timing');
          console.log('DNS Lookup:', Math.round(navigation.domainLookupEnd - navigation.domainLookupStart), 'ms');
          console.log('TCP Connection:', Math.round(navigation.connectEnd - navigation.connectStart), 'ms');
          console.log('Request:', Math.round(navigation.responseStart - navigation.requestStart), 'ms');
          console.log('Response:', Math.round(navigation.responseEnd - navigation.responseStart), 'ms');
          console.log('DOM Processing:', Math.round(navigation.domComplete - navigation.domLoading), 'ms');
          console.log('Load Complete:', Math.round(navigation.loadEventEnd - navigation.navigationStart), 'ms');
          console.groupEnd();
        }
      }
    };

    // Resource timing
    const logResourceTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        const slowResources = resources
          .filter(resource => resource.duration > 100)
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 5);

        if (slowResources.length > 0) {
          console.group('🐌 Slow Resources (>100ms)');
          slowResources.forEach(resource => {
            console.log(
              `${resource.name.split('/').pop()}: ${Math.round(resource.duration)}ms`
            );
          });
          console.groupEnd();
        }
      }
    };

    // Memory usage (Chrome only)
    const logMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.group('💾 Memory Usage');
        console.log('Used:', Math.round(memory.usedJSHeapSize / 1048576), 'MB');
        console.log('Total:', Math.round(memory.totalJSHeapSize / 1048576), 'MB');
        console.log('Limit:', Math.round(memory.jsHeapSizeLimit / 1048576), 'MB');
        console.groupEnd();
      }
    };

    // Bundle size analysis
    const logBundleInfo = () => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      
      console.group('📦 Bundle Info');
      console.log('Script files:', scripts.length);
      console.log('Stylesheet files:', styles.length);
      console.groupEnd();
    };

    // Run monitoring
    const runMonitoring = () => {
      observeWebVitals();
      
      // Wait for page load to get accurate timing
      if (document.readyState === 'complete') {
        setTimeout(() => {
          logNavigationTiming();
          logResourceTiming();
          logMemoryUsage();
          logBundleInfo();
        }, 1000);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            logNavigationTiming();
            logResourceTiming();
            logMemoryUsage();
            logBundleInfo();
          }, 1000);
        });
      }
    };

    runMonitoring();

    // Cleanup function
    return () => {
      // Performance observers are automatically cleaned up when component unmounts
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;
