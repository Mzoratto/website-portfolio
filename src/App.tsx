import React, { Suspense } from 'react';
import './App.css';
import SEOHead from './components/SEOHead';
import AccessibilityChecker from './components/AccessibilityChecker';

// Lazy load components for better performance
const Header = React.lazy(() => import('./components/Header'));
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="loading-container" role="status" aria-label="Loading content">
    <div className="loading-spinner" aria-hidden="true"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

/**
 * Main App component with lazy-loaded sections for optimal performance
 * Implements proper semantic HTML structure and accessibility features
 */
function App(): JSX.Element {
  return (
    <div className="App">
      {/* SEO and Accessibility */}
      <SEOHead />
      <AccessibilityChecker />

      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header with navigation */}
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>

      {/* Main content */}
      <main id="main-content" className="main-content">
        {/* Hero Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>

        {/* About Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>

        {/* Projects Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
