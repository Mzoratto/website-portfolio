import { useEffect } from 'react';
import { personalInfo, seoData } from '../data/portfolio';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

/**
 * SEO Head component for managing meta tags and structured data
 * Implements comprehensive SEO best practices
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title = seoData.title,
  description = seoData.description,
  keywords = seoData.keywords,
  ogImage = seoData.ogImage,
  canonicalUrl = seoData.canonicalUrl,
  structuredData,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', personalInfo.name);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', personalInfo.name, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:creator', '@yourusername'); // Update with actual Twitter handle

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('language', 'en');
    updateMetaTag('revisit-after', '7 days');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Structured Data (JSON-LD)
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      description: personalInfo.bio,
      url: canonicalUrl,
      email: personalInfo.email,
      telephone: personalInfo.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: personalInfo.location?.split(',')[0]?.trim(),
        addressCountry: personalInfo.location?.split(',')[1]?.trim(),
      },
      sameAs: [
        'https://github.com/yourusername',
        'https://linkedin.com/in/yourusername',
        'https://twitter.com/yourusername',
      ],
      knowsAbout: [
        'Web Development',
        'React',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Full Stack Development',
      ],
      alumniOf: {
        '@type': 'Organization',
        name: 'Your University', // Update with actual education
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Your Company', // Update with current employer
      },
    };

    const jsonLd = structuredData || defaultStructuredData;

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Meta tags and structured data will be updated on next render
      // No cleanup needed as they're replaced, not accumulated
    };
  }, [title, description, keywords, ogImage, canonicalUrl, structuredData]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
