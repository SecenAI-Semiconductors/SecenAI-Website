import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ContactForm = () => {
  const [status, setStatus] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
      <form>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: isDark ? '#e5e5e5' : '#374151' }}>Name</label>
          <input type="text" style={{
            width: '100%', padding: '12px',
            background: isDark ? '#111' : '#f9fafb',
            border: `1px solid ${isDark ? '#333' : '#d1d5db'}`,
            borderRadius: '8px',
            color: isDark ? '#fff' : '#1f2937',
            outline: 'none',
          }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: isDark ? '#e5e5e5' : '#374151' }}>Email</label>
          <input type="email" required style={{
            width: '100%', padding: '12px',
            background: isDark ? '#111' : '#f9fafb',
            border: `1px solid ${isDark ? '#333' : '#d1d5db'}`,
            borderRadius: '8px',
            color: isDark ? '#fff' : '#1f2937',
            outline: 'none',
          }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: isDark ? '#e5e5e5' : '#374151' }}>Inquiry Type</label>
          <select required defaultValue="" style={{
            width: '100%', padding: '12px',
            background: isDark ? '#111' : '#f9fafb',
            border: `1px solid ${isDark ? '#333' : '#d1d5db'}`,
            borderRadius: '8px',
            color: isDark ? '#fff' : '#1f2937',
            outline: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${isDark ? '%23666' : '%236b7280'}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            cursor: 'pointer',
          }}>
            <option value="" disabled style={{ color: '#999' }}>Select an inquiry type</option>
            <option value="product-demo">Product Demo Request</option>
            <option value="technical-support">Technical Support</option>
            <option value="pricing">Pricing &amp; Licensing</option>
            <option value="custom-integration">Custom Integration</option>
            <option value="Recruitment">Recruitment</option>
            <option value="general">Others</option>
          </select>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500', color: isDark ? '#e5e5e5' : '#374151' }}>Message</label>
          <textarea rows="4" style={{
            width: '100%', padding: '12px',
            background: isDark ? '#111' : '#f9fafb',
            border: `1px solid ${isDark ? '#333' : '#d1d5db'}`,
            borderRadius: '8px',
            color: isDark ? '#fff' : '#1f2937',
            resize: 'vertical',
            outline: 'none',
          }}></textarea>
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '14px',
          background: isDark ? '#ccff00' : '#059669',
          color: isDark ? '#000' : '#ffffff',
          border: 'none',
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer',
          marginTop: '10px',
        }}>
          Send Message
        </button>
      </form>

      <p style={{ fontSize: '12px', color: isDark ? '#666' : '#9ca3af', textAlign: 'center', marginTop: '20px' }}>
        Securely stored in Google Sheets for record-keeping and response purposes.
      </p>
    </div>
  );
};

export default ContactForm;