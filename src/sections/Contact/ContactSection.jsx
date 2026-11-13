import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../../config/siteConfig';

export function ContactSection({ selectedTopic, prefilledMessage, onToast, isStandalone = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Curious Minds Studio conversation');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [invalidField, setInvalidField] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  const copyResetTimerRef = useRef(null);
  const submitResetTimerRef = useRef(null);
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (selectedTopic) setTopic(selectedTopic);
    if (prefilledMessage) setMessage(prefilledMessage);
  }, [selectedTopic, prefilledMessage]);

  useEffect(() => () => {
    if (copyResetTimerRef.current) clearTimeout(copyResetTimerRef.current);
    if (submitResetTimerRef.current) clearTimeout(submitResetTimerRef.current);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email);
      } else {
        const fallback = document.createElement('textarea');
        fallback.value = siteConfig.email;
        fallback.setAttribute('readonly', '');
        fallback.style.position = 'fixed';
        fallback.style.opacity = '0';
        document.body.appendChild(fallback);
        fallback.select();
        const copiedWithFallback = document.execCommand('copy');
        fallback.remove();
        if (!copiedWithFallback) throw new Error('Clipboard unavailable');
      }
      setCopied(true);
      if (copyResetTimerRef.current) clearTimeout(copyResetTimerRef.current);
      copyResetTimerRef.current = setTimeout(() => {
        setCopied(false);
        copyResetTimerRef.current = null;
      }, 2400);
      if (onToast) onToast('Copied ' + siteConfig.email + ' to clipboard');
    } catch {
      if (onToast) onToast(siteConfig.email);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isComposing) return;

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (trimmedName.length < 2) {
      setInvalidField('name');
      setFormStatus({ type: 'error', message: 'Please enter your name (at least 2 characters).' });
      nameInputRef.current?.focus();
      return;
    }
    if (trimmedMessage.length < 10) {
      setInvalidField('message');
      setFormStatus({ type: 'error', message: 'Please include a little more detail (at least 10 characters).' });
      messageInputRef.current?.focus();
      return;
    }

    setInvalidField(null);
    setIsComposing(true);
    setFormStatus({ type: 'pending', message: 'Opening your email client...' });
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${topic} — from ${name}`);
    const mailtoBody = encodeURIComponent(`Hi Suklal,\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}\n\n— Sent from portfolio contact form`);
    window.location.href = ['mailto:', siteConfig.email, '?subject=', mailtoSubject, '&body=', mailtoBody].join('');
    if (onToast) onToast('Opening an email draft to ' + siteConfig.email);
    submitResetTimerRef.current = setTimeout(() => {
      setIsComposing(false);
      setFormStatus(null);
      submitResetTimerRef.current = null;
    }, 3000);
  };

  return (
    <section id="contact" className={`contact-section ${isStandalone ? 'contact-section-standalone' : ''}`}>
      <div className="container">
        <div className="contact-stage glass-crystal">
          {/* Left Column: Heading, Subtitle & Social Icons */}
          <div className="contact-left-col">
            <span className="contact-eyebrow">CONTACT</span>
            <h2 className="contact-title">
              Let's Build <br />
              <span className="holographic-text">Something Great.</span>
            </h2>
            <p className="contact-subtitle">
              Have an idea, project or opportunity in mind? I'd love to hear from you.
            </p>

            {/* Quick 1-Click Copy Button */}
            <div className="contact-copy-pill-wrap">
              <button
                type="button"
                className="contact-copy-pill glass-pill"
                id="copyEmailBtn"
                onClick={handleCopyEmail}
              >
                <span className="copy-dot" aria-hidden="true" />
                <span className="copy-text">{siteConfig.email}</span>
                <span className="copy-badge">{copied ? 'Copied!' : 'Copy Email Address'}</span>
              </button>
            </div>

            {/* Floating Glass Social Circle Icons */}
            <div className="contact-social-row" aria-label="Social Profiles">
              <a
                href={'mailto:' + siteConfig.email}
                className="social-glass-circle glass-frosted"
                title="Send Email"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-glass-circle glass-frosted"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-glass-circle glass-frosted"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-glass-circle glass-frosted"
                title="Instagram"
                aria-label="Instagram Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Liquid Glass Contact Form */}
          <div className="contact-right-col">
            <form id="portfolioContactForm" onSubmit={handleSubmit} noValidate className="contact-glass-form">
              <div className="form-dual-row">
                <div className="form-field-group">
                  <label className="form-label" htmlFor="contactName">
                    Your Name
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="contactName"
                    name="name"
                    className="form-input-pill glass-frosted"
                    placeholder="Your Name"
                    autoComplete="name"
                    value={name}
                    aria-invalid={invalidField === 'name' ? 'true' : undefined}
                    aria-describedby={invalidField === 'name' ? 'contactFormStatus' : undefined}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (invalidField === 'name') {
                        setInvalidField(null);
                        setFormStatus(null);
                      }
                    }}
                    required
                    minLength="2"
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-label" htmlFor="contactEmail">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    className="form-input-pill glass-frosted"
                    placeholder="Your Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label className="form-label" htmlFor="contactTopic">
                  Scope / Inquiry Type
                </label>
                <select
                  id="contactTopic"
                  name="topic"
                  className="form-input-pill form-select-pill glass-frosted"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="Curious Minds Studio conversation">Curious Minds Studio conversation</option>
                  <option value="Android / Flutter App Collaboration">Android / Flutter App Collaboration</option>
                  <option value="Website / App Inquiry">Website / App Inquiry</option>
                  <option value="Internship / Developer Opportunity">Internship / Developer Opportunity</option>
                  <option value="General Hello">General Inquiry</option>
                </select>
              </div>

              <div className="form-field-group">
                <label className="form-label" htmlFor="contactMessage">
                  Details / Message
                </label>
                <textarea
                  ref={messageInputRef}
                  id="contactMessage"
                  name="message"
                  className="form-textarea-pill glass-frosted"
                  placeholder="Tell me about your idea..."
                  value={message}
                  aria-invalid={invalidField === 'message' ? 'true' : undefined}
                  aria-describedby={invalidField === 'message' ? 'contactFormStatus' : undefined}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (invalidField === 'message') {
                      setInvalidField(null);
                      setFormStatus(null);
                    }
                  }}
                  required
                  minLength="10"
                />
              </div>

              {formStatus && (
                <p
                  id="contactFormStatus"
                  className={`form-status form-status-${formStatus.type}`}
                  role={formStatus.type === 'error' ? 'alert' : 'status'}
                >
                  {formStatus.message}
                </p>
              )}

              <div className="form-submit-row">
                <button
                  type="submit"
                  className="btn-contact-submit"
                  disabled={isComposing}
                  aria-label="Compose Message"
                >
                  <span>{isComposing ? 'Opening Email...' : 'Compose Message'}</span>
                  <span className="submit-arrow" aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}