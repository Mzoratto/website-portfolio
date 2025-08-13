import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks';
import { LazyImageProps } from '../types';
import './LazyImage.css';

/**
 * LazyImage component with intersection observer for performance optimization
 * Supports WebP/AVIF formats with fallbacks and proper accessibility
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLImageElement>(null);
  const isInViewport = useIntersectionObserver(imgRef, { threshold: 0.1 });

  // Generate WebP and AVIF sources if the original is not already in these formats
  const generateModernSources = (originalSrc: string) => {
    if (originalSrc.includes('data:') || originalSrc.includes('.svg')) {
      return [];
    }

    const baseSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const sources = [];

    // Add AVIF source (best compression)
    if (!originalSrc.includes('.avif')) {
      sources.push({
        srcSet: `${baseSrc}.avif`,
        type: 'image/avif',
      });
    }

    // Add WebP source (good compression, wide support)
    if (!originalSrc.includes('.webp')) {
      sources.push({
        srcSet: `${baseSrc}.webp`,
        type: 'image/webp',
      });
    }

    return sources;
  };

  const modernSources = generateModernSources(src);

  useEffect(() => {
    if (isInViewport && !isLoaded && !isError) {
      // Preload the image
      const img = new Image();
      
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      
      img.onerror = () => {
        setIsError(true);
        onError?.();
      };
      
      img.src = src;
    }
  }, [isInViewport, src, isLoaded, isError, onLoad, onError]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsError(true);
    onError?.();
  };

  return (
    <div 
      className={`lazy-image ${className}`}
      style={{ 
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {modernSources.length > 0 ? (
        <picture className="lazy-image__picture">
          {modernSources.map((source, index) => (
            <source
              key={index}
              srcSet={isInViewport ? source.srcSet : undefined}
              type={source.type}
            />
          ))}
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''} ${isError ? 'lazy-image__img--error' : ''}`}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </picture>
      ) : (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''} ${isError ? 'lazy-image__img--error' : ''}`}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !isError && (
        <div className="lazy-image__placeholder" aria-hidden="true">
          <div className="lazy-image__skeleton" />
        </div>
      )}
      
      {/* Error state */}
      {isError && (
        <div className="lazy-image__error" role="img" aria-label="Image failed to load">
          <svg
            className="lazy-image__error-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="lazy-image__error-text">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
