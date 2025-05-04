
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Image as ImageIcon, Download } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of what you want to generate.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const enhancedPrompt = `${prompt}. Create a detailed visualization about Zambia.`;
      
      const { data, error } = await supabase.functions.invoke("ai-image-generator", {
        body: { prompt: enhancedPrompt }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.image) {
        setGeneratedImage(data.image);
        toast({
          title: "Image generated",
          description: "Your visualization has been created successfully.",
        });
      } else {
        throw new Error("No image data received");
      }
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again with a different description.");
      toast({
        title: "Generation failed",
        description: "There was an error generating your image. Please try again.",
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
    link.download = `zambia-insight-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-zambia-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          AI Data Visualization Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Describe the visualization you want
            </label>
            <Textarea
              id="prompt"
              placeholder="e.g., A chart showing Zambia's copper exports over the last 5 years, or a map highlighting education statistics across provinces..."
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
                Generating Visualization...
              </>
            ) : (
              "Generate Visualization"
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
                  alt="AI Generated Visualization"
                  className="w-full h-auto"
                />
                <Button 
                  size="sm" 
                  onClick={handleDownload} 
                  className="absolute bottom-2 right-2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70"
                >
                  <Download className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/30 text-xs text-center text-gray-500">
        Powered by AI technology to visualize Zambian data insights
      </CardFooter>
    </Card>
  );
};

export default AIImageGenerator;
