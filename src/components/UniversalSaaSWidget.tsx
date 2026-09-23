import React, { useState, useEffect } from 'react';

export interface UniversalSaaSWidgetProps {
  productName: string;
  productVersion?: string;
  logoInitial?: string;
  accentColor?: string;
  theme?: 'dark' | 'light';
  storageKey?: string;
  onValidateToken?: (token: string) => Promise<boolean> | boolean;
  onProTask?: () => void;
}

export const UniversalSaaSWidget: React.FC<UniversalSaaSWidgetProps> = ({
  productName,
  productVersion = '1.0.0',
  logoInitial = 'S',
  accentColor = '#2563eb',
  theme = 'dark',
  storageKey = 'app_license_token',
  onValidateToken,
  onProTask
}) => {
  const [isLicensed, setIsLicensed] = useState<boolean>(false);
  const [tier, setTier] = useState<'FREE' | 'PRO' | 'ENTERPRISE'>('FREE');
  const [inputToken, setInputToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Standard License Active');

  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        if (saved.startsWith('ENT_')) {
          setIsLicensed(true);
          setTier('ENTERPRISE');
          setMessage('Enterprise License Verified');
        } else if (saved.startsWith('PRO_')) {
          setIsLicensed(true);
          setTier('PRO');
          setMessage('Pro License Verified');
        }
      }
    } catch (e) {}
  }, [storageKey]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = inputToken.trim();
    if (!token) return;

    setLoading(true);
    try {
      let isValid = false;
      if (onValidateToken) {
        isValid = await onValidateToken(token);
      } else {
        isValid = token.startsWith('PRO_') || token.startsWith('ENT_');
      }

      if (isValid) {
        const detectedTier = token.startsWith('ENT_') ? 'ENTERPRISE' : 'PRO';
        setIsLicensed(true);
        setTier(detectedTier);
        setMessage(`${detectedTier} License Activated Successfully`);
        localStorage.setItem(storageKey, token);
        setInputToken('');
      } else {
        setMessage('Invalid License Key');
      }
    } catch (err) {
      setMessage('Validation Error');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = () => {
    setIsLicensed(false);
    setTier('FREE');
    setMessage('License Revoked');
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {}
  };

  return (
    <div style={{
      padding: '20px',
      background: isDark ? '#090d16' : '#ffffff',
      color: isDark ? '#f8fafc' : '#0f172a',
      borderRadius: '14px',
      border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '400px',
      width: '100%',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`, paddingBottom: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: accentColor, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
            {logoInitial}
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{productName}</h4>
            <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>v{productVersion}</span>
          </div>
        </div>
        <span style={{ fontSize: '10px', padding: '3px 8px', background: isLicensed ? '#065f46' : '#1e293b', color: isLicensed ? '#34d399' : '#94a3b8', borderRadius: '999px', fontFamily: 'monospace', fontWeight: 700 }}>
          {tier}
        </span>
      </div>

      <div style={{ background: isDark ? '#020617' : '#f8fafc', padding: '10px', borderRadius: '8px', marginBottom: '14px', fontSize: '12px', fontFamily: 'monospace', border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}` }}>
        <span style={{ color: '#64748b', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>License Status</span>
        <strong style={{ color: isLicensed ? '#34d399' : '#38bdf8' }}>{message}</strong>
      </div>

      {!isLicensed ? (
        <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          <label style={{ fontSize: '11px', color: '#94a3b8' }}>Enter commercial license key:</label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input 
              type="text" 
              placeholder="PRO_XXXXXX or ENT_XXXXXX" 
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              style={{ flex: 1, padding: '8px 10px', background: isDark ? '#020617' : '#fff', color: isDark ? '#fff' : '#000', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace' }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '8px 14px', background: accentColor, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? '...' : 'Verify'}
            </button>
          </div>
        </form>
      ) : (
        <div style={{ marginBottom: '14px' }}>
          <button
            onClick={() => onProTask && onProTask()}
            style={{ width: '100%', padding: '10px', background: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '8px' }}
          >
            Execute Pro Feature ⚡
          </button>
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleRevoke} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'monospace' }}>
              Revoke License
            </button>
          </div>
        </div>
      )}

      <div style={{ borderTop: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`, paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#475569', fontFamily: 'monospace' }}>
        <span>Secured by SEOSiri Guard</span>
        <a href="https://developers.seosiri.com" target="_blank" rel="noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>API Docs</a>
      </div>
    </div>
  );
};

export default UniversalSaaSWidget;
