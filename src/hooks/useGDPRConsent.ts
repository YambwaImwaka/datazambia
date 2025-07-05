
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ConsentSettings {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
}

export const useGDPRConsent = () => {
  const { user } = useAuth();
  const [hasConsent, setHasConsent] = useState<ConsentSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConsent();
  }, [user]);

  const checkConsent = () => {
    const consentKey = user ? `consent_${user.id}` : 'consent_anonymous';
    const stored = localStorage.getItem(consentKey);
    
    if (stored) {
      try {
        const consent = JSON.parse(stored) as ConsentSettings;
        // Check if consent is still valid (e.g., within 1 year)
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        if (Date.now() - consent.timestamp < oneYear) {
          setHasConsent(consent);
        } else {
          // Consent expired, remove it
          localStorage.removeItem(consentKey);
          setHasConsent(null);
        }
      } catch (error) {
        console.error('Error parsing consent:', error);
        setHasConsent(null);
      }
    } else {
      setHasConsent(null);
    }
    
    setLoading(false);
  };

  const updateConsent = (newConsent: Partial<ConsentSettings>) => {
    const consentKey = user ? `consent_${user.id}` : 'consent_anonymous';
    const updated = {
      ...hasConsent,
      ...newConsent,
      timestamp: Date.now(),
    } as ConsentSettings;
    
    localStorage.setItem(consentKey, JSON.stringify(updated));
    setHasConsent(updated);
  };

  const revokeConsent = () => {
    const consentKey = user ? `consent_${user.id}` : 'consent_anonymous';
    localStorage.removeItem(consentKey);
    setHasConsent(null);
  };

  const canTrackAnalytics = () => {
    return hasConsent?.analytics === true;
  };

  const canTrackMarketing = () => {
    return hasConsent?.marketing === true;
  };

  return {
    hasConsent,
    loading,
    updateConsent,
    revokeConsent,
    canTrackAnalytics,
    canTrackMarketing,
    checkConsent,
  };
};
