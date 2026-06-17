import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { buildSubmissionPayload } from '../utils/emailTemplate';

// ─── Web3Forms Access Key ───────────────────────────────────────────
// Get your free access key at https://web3forms.com
// Then set VITE_WEB3FORMS_ACCESS_KEY in your .env file
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'a060d378-febe-4c21-ab3f-2ab7bf150341';

const ContactForm = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ─── Form State ─────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  // ─── Validation ─────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Handle Input Change ────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ─── Handle Submit ──────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Build JSON payload using the template utility
      const payload = buildSubmissionPayload({
        accessKey: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });

      console.log('📧 Web3Forms payload:', payload);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('📧 Web3Forms response:', result);

      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', inquiryType: '', message: '' });
        setErrors({});

        // Auto-dismiss success message after 6 seconds
        setTimeout(() => {
          setSubmitStatus(null);
          setStatusMessage('');
        }, 6000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Something went wrong. Please try again or email us directly at secen.semiconductor@gmail.com');

      // Auto-dismiss error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage('');
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Shared Input Styles ────────────────────────────────────────
  const inputStyle = {
    width: '100%',
    padding: '12px',
    background: isDark ? '#111' : '#f9fafb',
    border: `1px solid ${isDark ? '#333' : '#d1d5db'}`,
    borderRadius: '8px',
    color: isDark ? '#fff' : '#1f2937',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const inputErrorStyle = {
    ...inputStyle,
    border: `1px solid ${isDark ? '#ff4444' : '#ef4444'}`,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '500',
    color: isDark ? '#e5e5e5' : '#374151',
  };

  const errorTextStyle = {
    fontSize: '12px',
    color: isDark ? '#ff6b6b' : '#ef4444',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  // ─── Render ─────────────────────────────────────────────────────
  return (
    <div style={{
      padding: '40px',
      backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
      border: `1px solid ${isDark ? '#1a1a1a' : '#e5e7eb'}`,
      borderRadius: '16px',
      boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.08)',
      maxWidth: '500px',
      color: isDark ? '#ffffff' : '#1f2937',
    }}>

      {/* ── Status Toast ───────────────────────────────────────── */}
      {submitStatus && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontSize: '14px',
            lineHeight: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            animation: 'fadeIn 0.3s ease',
            ...(submitStatus === 'success'
              ? {
                backgroundColor: isDark ? 'rgba(204,255,0,0.1)' : 'rgba(5,150,105,0.08)',
                border: `1px solid ${isDark ? 'rgba(204,255,0,0.3)' : 'rgba(5,150,105,0.25)'}`,
                color: isDark ? '#ccff00' : '#059669',
              }
              : {
                backgroundColor: isDark ? 'rgba(255,68,68,0.1)' : 'rgba(239,68,68,0.08)',
                border: `1px solid ${isDark ? 'rgba(255,68,68,0.3)' : 'rgba(239,68,68,0.25)'}`,
                color: isDark ? '#ff6b6b' : '#ef4444',
              }),
          }}
        >
          <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>
            {submitStatus === 'success' ? '✓' : '✕'}
          </span>
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* ── Honeypot (hidden anti-spam field) ─────────────────── */}
        <input
          type="checkbox"
          name="botcheck"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* ── Name ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            style={errors.name ? inputErrorStyle : inputStyle}
          />
          {errors.name && <p style={errorTextStyle}>⚠ {errors.name}</p>}
        </div>

        {/* ── Email ────────────────────────────────────────────── */}
        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={errors.email ? inputErrorStyle : inputStyle}
          />
          {errors.email && <p style={errorTextStyle}>⚠ {errors.email}</p>}
        </div>

        {/* ── Inquiry Type ─────────────────────────────────────── */}
        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Inquiry Type</label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            style={{
              ...(errors.inquiryType ? inputErrorStyle : inputStyle),
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${isDark ? '%23666' : '%236b7280'}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              cursor: 'pointer',
            }}
          >
            <option value="" disabled style={{ color: '#999' }}>Select an inquiry type</option>
            <option value="product-demo">Product Demo Request</option>
            <option value="technical-support">Technical Support</option>
            <option value="pricing">Pricing &amp; Licensing</option>
            <option value="custom-integration">Custom Integration</option>
            <option value="Recruitment">Recruitment</option>
            <option value="general">Others</option>
          </select>
          {errors.inquiryType && <p style={errorTextStyle}>⚠ {errors.inquiryType}</p>}
        </div>

        {/* ── Message ──────────────────────────────────────────── */}
        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project or inquiry..."
            style={{
              ...(errors.message ? inputErrorStyle : inputStyle),
              resize: 'vertical',
            }}
          />
          {errors.message && <p style={errorTextStyle}>⚠ {errors.message}</p>}
        </div>

        {/* ── Submit Button ────────────────────────────────────── */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '14px',
            background: isSubmitting
              ? (isDark ? 'rgba(204,255,0,0.5)' : 'rgba(5,150,105,0.5)')
              : (isDark ? '#ccff00' : '#059669'),
            color: isDark ? '#000' : '#ffffff',
            border: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '10px',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {isSubmitting ? (
            <>
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  border: `2px solid ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)'}`,
                  borderTopColor: isDark ? '#000' : '#fff',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.6s linear infinite',
                }}
              />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      <p style={{ fontSize: '12px', color: isDark ? '#666' : '#9ca3af', textAlign: 'center', marginTop: '20px' }}>
        Your information is securely sent and never shared with third parties.
      </p>

      {/* ── Inline keyframe animations ─────────────────────────── */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;