import React, { useState, useEffect } from 'react';
import { RevealHeading } from '../../components/common/RevealHeading';

export function ContactSection({ selectedTopic, prefilledMessage, onToast }) {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('CodeCraft Digital Website Package');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedTopic) setTopic(selectedTopic);
    if (prefilledMessage) setMessage(prefilledMessage);
  }, [selectedTopic, prefilledMessage]);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText('suklalgorai@gmail.com');
      } else {
        const fallback = document.createElement('textarea');
        fallback.value = 'suklalgorai@gmail.com';
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
      setTimeout(() => setCopied(false), 2400);
      if (onToast) onToast('Copied suklalgorai@gmail.com to clipboard');
    } catch {
      if (onToast) onToast('suklalgorai@gmail.com');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${topic} — from ${name}`);
    const mailtoBody = encodeURIComponent(`Hi Suklal,\n\nName: ${name}\nTopic: ${topic}\n\n${message}\n\n— Sent from portfolio contact form`);
    window.location.href = `mailto:suklalgorai@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    if (onToast) onToast('Opened email draft to suklalgorai@gmail.com');
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">05 • Get In Touch</span>
          <RevealHeading className="section-title">Have a problem worth building around?</RevealHeading>
          <p className="section-subtitle">
            Tell me what is stuck, what could be clearer, or what you want to make real. I’ll bring the technical plan and an honest next step.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card reveal">
            <h3 className="contact-heading">Direct Channels</h3>
            <p className="contact-text">
              Reach out directly via email or verified social platforms. I typically respond within 24 hours.
            </p>

            <div className="contact-channel-list">
              <a href="mailto:suklalgorai@gmail.com" className="contact-channel">
                <span className="contact-channel-left">
                  <span className="channel-icon-wrap" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span className="channel-text">suklalgorai@gmail.com</span>
                </span>
                <span className="channel-action">
                  Email
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>

              <button
                type="button"
                className="contact-channel"
                id="copyEmailBtn"
                onClick={handleCopyEmail}
                style={{ width: '100%', cursor: 'pointer', textAlign: 'left', background: 'transparent' }}
              >
                <span className="contact-channel-left">
                  <span className="channel-icon-wrap" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </span>
                  <span className="channel-text">Copy Email Address</span>
                </span>
                <span className="channel-action accent-amber">
                  {copied ? 'Copied!' : '1-Click Copy'}
                </span>
              </button>

              <a
                href="https://github.com/suklalgorai-creator"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <span className="contact-channel-left">
                  <span className="channel-icon-wrap" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </span>
                  <span className="channel-text">github.com/suklalgorai-creator</span>
                </span>
                <span className="channel-action muted">
                  Profile
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/suklal-gorai-7ab4533b0"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <span className="contact-channel-left">
                  <span className="channel-icon-wrap" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </span>
                  <span className="channel-text">linkedin.com/in/suklal-gorai</span>
                </span>
                <span className="channel-action muted">
                  Connect
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>

              <a
                href="https://instagram.com/suklal_gorai"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <span className="contact-channel-left">
                  <span className="channel-icon-wrap" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </span>
                  <span className="channel-text">@suklal_gorai</span>
                </span>
                <span className="channel-action muted">
                  Direct
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="contact-form-card reveal">
            <h3 className="contact-heading">Project Brief</h3>
            <p className="contact-text">
              Share your project goals or inquiries below to initiate a direct conversation.
            </p>
            <form id="portfolioContactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  className="form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contactTopic">
                  Scope / Inquiry Type
                </label>
                <select
                  id="contactTopic"
                  className="form-select"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="CodeCraft Digital Website Package">CodeCraft Digital Website Package</option>
                  <option value="Android / Flutter App Collaboration">Android / Flutter App Collaboration</option>
                  <option value="Client Website / App Inquiry">Client Website / App Inquiry</option>
                  <option value="Internship / Developer Opportunity">Internship / Developer Opportunity</option>
                  <option value="General Hello">General Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contactMessage">
                  Details / Message
                </label>
                <textarea
                  id="contactMessage"
                  className="form-textarea"
                  placeholder="Describe your timeline, features, or design requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-submit">
                <span>Compose Message</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
