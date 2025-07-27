import React from 'react';
import { useMaintenanceMode } from '@/hooks/useSystemSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Wrench, Clock, RefreshCw } from 'lucide-react';

interface MaintenanceModeProps {
  children: React.ReactNode;
}

export const MaintenanceMode: React.FC<MaintenanceModeProps> = ({ children }) => {
  const isMaintenanceMode = useMaintenanceMode();

  if (!isMaintenanceMode) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
            <Wrench className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Under Maintenance
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            We're currently performing scheduled maintenance to improve your experience. 
            Please check back soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Expected completion: Soon</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span>What's happening?</span>
            </div>
            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 text-left">
              <li>• System updates and improvements</li>
              <li>• Performance optimizations</li>
              <li>• Security enhancements</li>
              <li>• Database maintenance</li>
            </ul>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Check Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}; 