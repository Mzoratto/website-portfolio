import React, { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolio';
import { scrollToElement } from '../utils';
import LazyImage from './LazyImage';
import './Hero.css';

/**
 * Hero section component with professional introduction and call-to-action
 * Features responsive design, animations, and accessibility
 */
const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContactClick = () => {
    scrollToElement('contact', 80);
  };

  const handleProjectsClick = () => {
    scrollToElement('projects', 80);
  };

  const handleResumeClick = () => {
    if (personalInfo.resumeUrl) {
      window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      id="hero" 
      className={`hero ${isVisible ? 'hero--visible' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="container">
        <div className="hero__content">
          {/* Text Content */}
          <div className="hero__text">
            <div className="hero__greeting">
              <span className="hero__greeting-text">Hello, I'm</span>
            </div>
            
            <h1 id="hero-title" className="hero__name">
              {personalInfo.name}
            </h1>
            
            <h2 className="hero__title">
              {personalInfo.title}
            </h2>
            
            <p className="hero__subtitle">
              {personalInfo.subtitle}
            </p>
            
            <div className="hero__description">
              <p>{personalInfo.bio}</p>
            </div>

            {/* Call to Action Buttons */}
            <div className="hero__actions">
              <button
                onClick={handleContactClick}
                className="btn btn-primary hero__cta"
                aria-label="Get in touch - scroll to contact section"
              >
                Get In Touch
                <span className="hero__cta-icon" aria-hidden="true">→</span>
              </button>
              
              <button
                onClick={handleProjectsClick}
                className="btn btn-secondary hero__cta"
                aria-label="View my work - scroll to projects section"
              >
                View My Work
              </button>
              
              {personalInfo.resumeUrl && (
                <button
                  onClick={handleResumeClick}
                  className="btn btn-secondary hero__cta"
                  aria-label="Download resume (opens in new tab)"
                >
                  Download Resume
                  <span className="hero__cta-icon" aria-hidden="true">↓</span>
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">5+</span>
                <span className="hero__stat-label">Years Experience</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">50+</span>
                <span className="hero__stat-label">Projects Completed</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">100%</span>
                <span className="hero__stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="hero__image">
            <div className="hero__image-container">
              <LazyImage
                src={personalInfo.profileImage}
                alt={personalInfo.profileImageAlt}
                className="hero__profile-img"
                width={400}
                height={400}
              />
              
              {/* Decorative elements */}
              <div className="hero__image-decoration hero__image-decoration--1" aria-hidden="true" />
              <div className="hero__image-decoration hero__image-decoration--2" aria-hidden="true" />
              <div className="hero__image-decoration hero__image-decoration--3" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero__scroll-indicator">
          <button
            onClick={() => scrollToElement('about', 80)}
            className="hero__scroll-button"
            aria-label="Scroll to about section"
          >
            <span className="hero__scroll-text">Scroll to explore</span>
            <div className="hero__scroll-arrow" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="hero__background" aria-hidden="true">
        <div className="hero__bg-shape hero__bg-shape--1"></div>
        <div className="hero__bg-shape hero__bg-shape--2"></div>
        <div className="hero__bg-shape hero__bg-shape--3"></div>
      </div>
    </section>
  );
};

export default Hero;
