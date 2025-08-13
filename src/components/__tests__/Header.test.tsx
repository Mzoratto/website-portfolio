import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

// Mock the hooks
vi.mock('../../hooks', () => ({
  useScrollPosition: () => 0,
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    isDark: false,
  }),
}));

// Mock the utils
vi.mock('../../utils', () => ({
  scrollToElement: vi.fn(),
}));

describe('Header Component', () => {
  it('renders navigation items', () => {
    render(<Header />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders logo button', () => {
    render(<Header />);
    
    const logoButton = screen.getByLabelText('Go to homepage');
    expect(logoButton).toBeInTheDocument();
    expect(logoButton).toHaveTextContent('Portfolio');
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    
    const themeToggle = screen.getByLabelText('Switch to dark mode');
    expect(themeToggle).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    
    const mobileMenuButton = screen.getByLabelText('Open navigation menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    
    const mobileMenuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(mobileMenuButton);
    
    expect(screen.getByLabelText('Close navigation menu')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
  });
});
