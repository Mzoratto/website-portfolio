import React, { useState, useEffect } from 'react';
import { navItems } from '../data/portfolio';
import { useScrollPosition, useTheme } from '../hooks';
import { scrollToElement } from '../utils';
import './Header.css';

/**
 * Header component with responsive navigation and theme toggle
 * Implements WCAG 2.1 AA accessibility standards
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollPosition = useScrollPosition();
  const { theme, setTheme, isDark } = useTheme();

  // Add scroll-based styling
  const isScrolled = scrollPosition > 50;

  // Handle navigation click
  const handleNavClick = (href: string, id: string) => {
    const sectionId = href.replace('#', '');
    scrollToElement(sectionId, 80); // Offset for fixed header
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Update active section based on scroll position
  useEffect(() => {
    const sections = navItems.map(item => item.href.replace('#', ''));
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      const navItem = navItems.find(item => item.href === `#${currentSection}`);
      if (navItem) {
        setActiveSection(navItem.id);
      }
    }
  }, [scrollPosition]);

  return (
    <header 
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      role="banner"
    >
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <button
              onClick={() => handleNavClick('#hero', 'home')}
              className="logo-button"
              aria-label="Go to homepage"
            >
              <span className="logo-text">Portfolio</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav" role="navigation" aria-label="Main navigation">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`nav-link ${activeSection === item.id ? 'nav-link--active' : ''}`}
                    aria-label={item.ariaLabel}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="theme-toggle"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {isDark ? '☀️' : '🌙'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`mobile-menu-button ${isMenuOpen ? 'mobile-menu-button--open' : ''}`}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <nav role="navigation" aria-label="Mobile navigation">
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="mobile-nav-item">
                  <button
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`mobile-nav-link ${activeSection === item.id ? 'mobile-nav-link--active' : ''}`}
                    aria-label={item.ariaLabel}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
