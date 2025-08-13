import React, { useRef, useState } from 'react';
import { personalInfo, socialLinks } from '../data/portfolio';
import { useIntersectionObserver, useForm } from '../hooks';
import { ContactForm } from '../types';
import { isValidEmail, copyToClipboard } from '../utils';
import './Contact.css';

/**
 * Contact section component with form validation and social links
 * Features accessible form, validation, and social media integration
 */
const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copyStatus, setCopyStatus] = useState<string>('');

  // Form validation
  const validateForm = (values: ContactForm) => {
    const errors: Partial<Record<keyof ContactForm, string>> = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!values.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (values.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  // Form hook
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    isValid,
  } = useForm<ContactForm>(
    {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validateForm
  );

  // Handle form submission
  const onSubmit = async (formData: ContactForm) => {
    try {
      // In a real application, you would send this to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mailto link as fallback
      const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // Handle social link clicks
  const handleSocialClick = (link: typeof socialLinks[0]) => {
    if (link.id === 'email') {
      window.location.href = link.url;
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle copy email
  const handleCopyEmail = async () => {
    const success = await copyToClipboard(personalInfo.email);
    if (success) {
      setCopyStatus('Email copied to clipboard!');
      setTimeout(() => setCopyStatus(''), 3000);
    } else {
      setCopyStatus('Failed to copy email');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`contact ${isVisible ? 'contact--visible' : ''}`}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact__content">
          {/* Section Header */}
          <div className="contact__header">
            <h2 id="contact-title" className="contact__title">
              Get In Touch
            </h2>
            <p className="contact__subtitle">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          <div className="contact__grid">
            {/* Contact Info */}
            <div className="contact__info">
              <h3 className="contact__info-title">Let's Connect</h3>
              <p className="contact__info-text">
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a chat about technology and development.
              </p>

              {/* Contact Details */}
              <div className="contact__details">
                <div className="contact__detail">
                  <div className="contact__detail-icon" aria-hidden="true">
                    <EmailIcon />
                  </div>
                  <div className="contact__detail-content">
                    <span className="contact__detail-label">Email</span>
                    <div className="contact__detail-actions">
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="contact__detail-value"
                        aria-label={`Send email to ${personalInfo.email}`}
                      >
                        {personalInfo.email}
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="contact__copy-btn"
                        aria-label="Copy email address"
                        title="Copy email address"
                      >
                        <CopyIcon />
                      </button>
                    </div>
                    {copyStatus && (
                      <span className="contact__copy-status" role="status" aria-live="polite">
                        {copyStatus}
                      </span>
                    )}
                  </div>
                </div>

                {personalInfo.phone && (
                  <div className="contact__detail">
                    <div className="contact__detail-icon" aria-hidden="true">
                      <PhoneIcon />
                    </div>
                    <div className="contact__detail-content">
                      <span className="contact__detail-label">Phone</span>
                      <a 
                        href={`tel:${personalInfo.phone}`}
                        className="contact__detail-value"
                        aria-label={`Call ${personalInfo.phone}`}
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {personalInfo.location && (
                  <div className="contact__detail">
                    <div className="contact__detail-icon" aria-hidden="true">
                      <LocationIcon />
                    </div>
                    <div className="contact__detail-content">
                      <span className="contact__detail-label">Location</span>
                      <span className="contact__detail-value">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="contact__social">
                <h4 className="contact__social-title">Follow Me</h4>
                <div className="contact__social-links">
                  {socialLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleSocialClick(link)}
                      className="contact__social-btn"
                      aria-label={link.ariaLabel}
                      title={link.name}
                    >
                      <SocialIcon icon={link.icon} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact__form-container">
              <h3 className="contact__form-title">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="contact__status contact__status--success" role="alert">
                  <CheckIcon />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="contact__status contact__status--error" role="alert">
                  <ErrorIcon />
                  <span>Failed to send message. Please try again or use the email link above.</span>
                </div>
              )}

              <form 
                className="contact__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit);
                }}
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="Your full name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span id="name-error" className="form-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="your.email@example.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span id="email-error" className="form-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={values.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                    placeholder="What's this about?"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <span id="subject-error" className="form-error" role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span id="message-error" className="form-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact__submit"
                  disabled={isSubmitting || !isValid}
                  aria-describedby="submit-help"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading" aria-hidden="true">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
                
                <p id="submit-help" className="form-help">
                  * Required fields. Your information will be kept private.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Icon Components
const EmailIcon: React.FC = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const LocationIcon: React.FC = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const CopyIcon: React.FC = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const ErrorIcon: React.FC = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => {
  // Reuse the same social icons from Footer component
  const iconProps = {
    width: "20",
    height: "20",
    fill: "currentColor",
    "aria-hidden": "true" as const,
  };

  switch (icon) {
    case 'github':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      );
    case 'email':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
        </svg>
      );
    default:
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      );
  }
};

export default Contact;
