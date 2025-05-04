
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const huggingFaceToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
if (!huggingFaceToken) {
  throw new Error('HUGGING_FACE_ACCESS_TOKEN is not set');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    console.log(`Generating image with prompt: "${prompt}"`);
    
    // Call Hugging Face API to generate image with a high-quality model
    const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${huggingFaceToken}`
      },
      body: JSON.stringify({
        inputs: prompt,
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Hugging Face API error:", errorData);
      throw new Error(`Hugging Face API error: ${response.status} ${errorData}`);
    }

    // Get the image data as a blob
    const imageBlob = await response.blob();
    // Convert to base64 for easy transfer
    const imageBuffer = await imageBlob.arrayBuffer();
    const base64Image = btoa(
      new Uint8Array(imageBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    console.log("Image generation successful");

    return new Response(
      JSON.stringify({ 
        image: `data:image/png;base64,${base64Image}`,
        message: "Image generated successfully" 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in AI image generation:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while generating the image",
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
