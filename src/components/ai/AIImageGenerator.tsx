
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Image as ImageIcon, Download, MapPin, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [visualType, setVisualType] = useState("chart");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const visualTypes = [
    { id: "chart", name: "Data Chart/Graph", icon: BarChart },
    { id: "map", name: "Geographic Map", icon: MapPin },
    { id: "infographic", name: "Infographic", icon: ImageIcon },
    { id: "dashboard", name: "Dashboard Layout", icon: BarChart }
  ];

  const samplePrompts = {
    chart: "Bar chart showing Zambia's GDP growth over the last 5 years with green and copper color scheme",
    map: "Map of Zambia highlighting the 10 provinces with population density indicators",
    infographic: "Infographic showing Zambia's key agricultural exports including maize, tobacco, and cotton with statistics",
    dashboard: "Modern dashboard design showing Zambia's economic indicators including copper prices, inflation rate, and employment statistics"
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please describe the visualization you want to create.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Enhanced prompt for Zambian data visualizations
      const enhancedPrompt = `Create a professional ${visualType} visualization: ${prompt}. 
      Style: Clean, modern data visualization suitable for a government or research report.
      Colors: Use Zambia's national colors (green, red, black, orange) and copper tones where appropriate.
      Context: This is for the Zambia Data Hub, focusing on economic, social, and development data.
      Quality: High-resolution, professional appearance with clear labels and legends.`;
      
      const { data, error } = await supabase.functions.invoke("ai-image-generator", {
        body: { prompt: enhancedPrompt }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.image) {
        setGeneratedImage(data.image);
        toast({
          title: "Visualization created",
          description: "Your Zambian data visualization has been generated successfully.",
        });
      } else {
        throw new Error("No image data received");
      }
    } catch (err) {
      console.error("Error generating visualization:", err);
      setError("Failed to generate visualization. Please try with a more specific description.");
      toast({
        title: "Generation failed",
        description: "There was an error creating your visualization. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `zambia-data-viz-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const useSamplePrompt = () => {
    setPrompt(samplePrompts[visualType as keyof typeof samplePrompts]);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-green-600 to-zambia-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Zambia Data Visualization Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Visualization Type
            </label>
            <Select value={visualType} onValueChange={setVisualType}>
              <SelectTrigger>
                <SelectValue placeholder="Select visualization type" />
              </SelectTrigger>
              <SelectContent>
                {visualTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      {type.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Describe your visualization
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={useSamplePrompt}
                className="text-xs"
              >
                Use Example
              </Button>
            </div>
            <Textarea
              id="prompt"
              placeholder={`e.g., ${samplePrompts[visualType as keyof typeof samplePrompts]}`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
              disabled={isGenerating}
            />
          </div>

          <Button 
            onClick={handleGenerateImage} 
            disabled={isGenerating || !prompt.trim()} 
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Visualization...
              </>
            ) : (
              "Generate Data Visualization"
            )}
          </Button>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {generatedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mt-4"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Generated Visualization:</p>
              <div className="relative border rounded-md overflow-hidden">
                <img 
                  src={generatedImage} 
                  alt="AI Generated Data Visualization"
                  className="w-full h-auto"
                />
                <Button 
                  size="sm" 
                  onClick={handleDownload} 
                  className="absolute bottom-2 right-2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70"
                >
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/30 text-xs text-center text-gray-500">
        AI-powered data visualization for Zambian statistics and analytics
      </CardFooter>
    </Card>
  );
};

export default AIImageGenerator;
