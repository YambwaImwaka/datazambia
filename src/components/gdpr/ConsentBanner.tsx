
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { Shield, X, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ConsentBanner = () => {
  const { user } = useAuth();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consents, setConsents] = useState({
    analytics: false,
    marketing: false,
    functional: true, // Always required
  });

  useEffect(() => {
    checkConsentStatus();
  }, [user]);

  const checkConsentStatus = async () => {
    const consentKey = user ? `consent_${user.id}` : 'consent_anonymous';
    const existingConsent = localStorage.getItem(consentKey);
    
    if (!existingConsent) {
      setShowBanner(true);
    }
  };

  const handleConsentSubmit = async (acceptAll = false) => {
    const finalConsents = acceptAll 
      ? { analytics: true, marketing: true, functional: true }
      : consents;

    try {
      // Store consent in database and localStorage
      const sessionId = localStorage.getItem('session_id') || crypto.randomUUID();
      localStorage.setItem('session_id', sessionId);

      const consentTypes = ['analytics', 'marketing', 'functional'];
      
      for (const type of consentTypes) {
        await supabase.from('user_consent').insert({
          user_id: user?.id || null,
          session_id: sessionId,
          consent_type: type,
          consent_given: finalConsents[type as keyof typeof finalConsents],
          ip_address: null, // We don't track IPs for privacy
          user_agent: navigator.userAgent,
        });
      }

      // Store in localStorage for quick access
      const consentKey = user ? `consent_${user.id}` : 'consent_anonymous';
      localStorage.setItem(consentKey, JSON.stringify({
        ...finalConsents,
        timestamp: Date.now(),
      }));

      setShowBanner(false);
    } catch (error) {
      console.error('Error saving consent:', error);
    }
  };

  const handleConsentChange = (type: string, checked: boolean) => {
    setConsents(prev => ({
      ...prev,
      [type]: checked,
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg border-2">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Privacy & Cookie Consent</h3>
              
              {!showDetails ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    We use cookies and similar technologies to improve your experience, analyze site usage, 
                    and assist with marketing. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => handleConsentSubmit(true)}>
                      Accept All
                    </Button>
                    <Button variant="outline" onClick={() => setShowDetails(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                    <Button variant="ghost" onClick={() => handleConsentSubmit(false)}>
                      Reject All
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose which types of cookies you want to allow:
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="functional" 
                        checked={true} 
                        disabled={true}
                      />
                      <div>
                        <label htmlFor="functional" className="text-sm font-medium">
                          Functional (Required)
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Essential cookies for the website to function properly.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="analytics" 
                        checked={consents.analytics}
                        onCheckedChange={(checked) => handleConsentChange('analytics', checked as boolean)}
                      />
                      <div>
                        <label htmlFor="analytics" className="text-sm font-medium">
                          Analytics
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Help us understand how visitors use our website.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="marketing" 
                        checked={consents.marketing}
                        onCheckedChange={(checked) => handleConsentChange('marketing', checked as boolean)}
                      />
                      <div>
                        <label htmlFor="marketing" className="text-sm font-medium">
                          Marketing
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Personalized content and targeted advertising.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => handleConsentSubmit()}>
                      Save Preferences
                    </Button>
                    <Button variant="outline" onClick={() => setShowDetails(false)}>
                      Back
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowBanner(false)}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentBanner;
