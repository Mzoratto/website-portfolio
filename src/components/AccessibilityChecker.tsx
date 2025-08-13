import { useEffect } from 'react';

/**
 * Accessibility checker component for development
 * Performs basic accessibility audits and logs issues
 */
const AccessibilityChecker: React.FC = () => {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const checkAccessibility = () => {
      const issues: string[] = [];

      // Check for missing alt attributes on images
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt && !img.getAttribute('aria-hidden')) {
          issues.push(`Image ${index + 1} missing alt attribute: ${img.src}`);
        }
      });

      // Check for missing form labels
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach((input, index) => {
        const id = input.id;
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');
        
        if (!label && !ariaLabel && !ariaLabelledby) {
          issues.push(`Form control ${index + 1} missing label: ${input.tagName.toLowerCase()}`);
        }
      });

      // Check for missing heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        if (index === 0 && level !== 1) {
          issues.push('Page should start with h1');
        }
        if (level > previousLevel + 1) {
          issues.push(`Heading level skipped: ${heading.tagName} after h${previousLevel}`);
        }
        previousLevel = level;
      });

      // Check for missing main landmark
      const main = document.querySelector('main');
      if (!main) {
        issues.push('Page missing main landmark');
      }

      // Check for missing skip links
      const skipLink = document.querySelector('a[href^="#"]');
      if (!skipLink || !skipLink.textContent?.toLowerCase().includes('skip')) {
        issues.push('Page missing skip navigation link');
      }

      // Check for low contrast (basic check)
      const checkContrast = (element: Element) => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        // This is a simplified check - in production, use a proper contrast ratio calculator
        if (color === backgroundColor) {
          issues.push(`Potential contrast issue on ${element.tagName.toLowerCase()}`);
        }
      };

      // Check contrast on text elements
      const textElements = document.querySelectorAll('p, span, div, a, button, h1, h2, h3, h4, h5, h6');
      textElements.forEach(checkContrast);

      // Check for missing focus indicators
      const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach((element, index) => {
        const styles = window.getComputedStyle(element, ':focus');
        const outline = styles.outline;
        const boxShadow = styles.boxShadow;
        
        if (outline === 'none' && boxShadow === 'none') {
          // This is a simplified check - custom focus styles might be implemented differently
          console.warn(`Element ${index + 1} might be missing focus indicator:`, element);
        }
      });

      // Check for missing lang attribute
      if (!document.documentElement.lang) {
        issues.push('HTML element missing lang attribute');
      }

      // Check for missing page title
      if (!document.title || document.title.trim() === '') {
        issues.push('Page missing title');
      }

      // Check for empty links
      const links = document.querySelectorAll('a');
      links.forEach((link, index) => {
        const text = link.textContent?.trim();
        const ariaLabel = link.getAttribute('aria-label');
        const title = link.getAttribute('title');
        
        if (!text && !ariaLabel && !title) {
          issues.push(`Link ${index + 1} has no accessible text`);
        }
      });

      // Check for missing button text
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button, index) => {
        const text = button.textContent?.trim();
        const ariaLabel = button.getAttribute('aria-label');
        
        if (!text && !ariaLabel) {
          issues.push(`Button ${index + 1} has no accessible text`);
        }
      });

      // Check for tables without headers
      const tables = document.querySelectorAll('table');
      tables.forEach((table, index) => {
        const headers = table.querySelectorAll('th');
        if (headers.length === 0) {
          issues.push(`Table ${index + 1} missing header cells`);
        }
      });

      // Log results
      if (issues.length > 0) {
        console.group('♿ Accessibility Issues Found');
        issues.forEach(issue => console.warn(issue));
        console.groupEnd();
      } else {
        console.log('♿ No accessibility issues detected');
      }

      // Check for ARIA best practices
      const ariaIssues: string[] = [];
      
      // Check for invalid ARIA attributes
      const elementsWithAria = document.querySelectorAll('[aria-*]');
      elementsWithAria.forEach((element) => {
        const ariaAttributes = Array.from(element.attributes).filter(attr => 
          attr.name.startsWith('aria-')
        );
        
        ariaAttributes.forEach(attr => {
          // Basic validation - in production, use a comprehensive ARIA validator
          if (attr.name === 'aria-hidden' && attr.value !== 'true' && attr.value !== 'false') {
            ariaIssues.push(`Invalid aria-hidden value: ${attr.value}`);
          }
        });
      });

      if (ariaIssues.length > 0) {
        console.group('🏷️ ARIA Issues Found');
        ariaIssues.forEach(issue => console.warn(issue));
        console.groupEnd();
      }

      // Performance impact warning
      if (issues.length > 10) {
        console.warn('⚠️ Many accessibility issues detected. Consider using automated tools like axe-core for comprehensive testing.');
      }
    };

    // Run check after DOM is fully loaded
    const runCheck = () => {
      setTimeout(checkAccessibility, 1000);
    };

    if (document.readyState === 'complete') {
      runCheck();
    } else {
      window.addEventListener('load', runCheck);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', runCheck);
    };
  }, []);

  return null;
};

export default AccessibilityChecker;
