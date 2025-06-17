
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain } from "lucide-react";

interface SoilHealthViewProps {
  selectedProvince: string;
  selectedYear: string;
}

export const SoilHealthView = ({ selectedProvince, selectedYear }: SoilHealthViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mountain className="h-5 w-5" />
          Soil Health Analysis
          {selectedProvince !== "all" && (
            <span className="text-sm bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded">
              {selectedProvince}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Soil health analysis dashboard coming soon
          </p>
          <p className="text-sm text-gray-400">
            Will include pH levels, nutrient content, and soil quality metrics
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
