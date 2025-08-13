import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatRelativeTime,
  debounce,
  isValidEmail,
  sanitizeString,
  formatFileSize,
  getDeviceType,
} from '../index';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2024-01-15';
      const formatted = formatDate(date);
      expect(formatted).toBe('January 15, 2024');
    });
  });

  describe('formatRelativeTime', () => {
    it('returns "Today" for current date', () => {
      const today = new Date().toISOString();
      const result = formatRelativeTime(today);
      expect(result).toBe('Today');
    });

    it('returns "Yesterday" for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const result = formatRelativeTime(yesterday.toISOString());
      expect(result).toBe('Yesterday');
    });

    it('returns days ago for recent dates', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const result = formatRelativeTime(threeDaysAgo.toISOString());
      expect(result).toBe('3 days ago');
    });
  });

  describe('debounce', () => {
    it('delays function execution', (done) => {
      let called = false;
      const debouncedFn = debounce(() => {
        called = true;
      }, 100);

      debouncedFn();
      expect(called).toBe(false);

      setTimeout(() => {
        expect(called).toBe(true);
        done();
      }, 150);
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('sanitizes HTML content', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeString(input);
      expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;Hello');
    });
  });

  describe('formatFileSize', () => {
    it('formats bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });
  });

  describe('getDeviceType', () => {
    it('returns correct device type based on window width', () => {
      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      expect(getDeviceType()).toBe('mobile');

      window.innerWidth = 800;
      expect(getDeviceType()).toBe('tablet');

      window.innerWidth = 1200;
      expect(getDeviceType()).toBe('desktop');
    });
  });
});
