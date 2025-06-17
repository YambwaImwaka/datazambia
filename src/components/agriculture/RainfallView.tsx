
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain } from "lucide-react";

interface RainfallViewProps {
  selectedProvince: string;
  selectedYear: string;
}

export const RainfallView = ({ selectedProvince, selectedYear }: RainfallViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudRain className="h-5 w-5" />
          Rainfall Patterns
          {selectedProvince !== "all" && (
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              {selectedProvince}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Rainfall patterns dashboard coming soon
          </p>
          <p className="text-sm text-gray-400">
            Will include seasonal patterns, historical data, and forecasts
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
