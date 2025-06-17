
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beef, TrendingUp } from "lucide-react";

interface LivestockViewProps {
  selectedProvince: string;
  selectedYear: string;
}

export const LivestockView = ({ selectedProvince, selectedYear }: LivestockViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beef className="h-5 w-5" />
          Livestock Data
          {selectedProvince !== "all" && (
            <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
              {selectedProvince}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Livestock data dashboard coming soon
          </p>
          <p className="text-sm text-gray-400">
            Will include cattle, goats, pigs, and poultry statistics
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
