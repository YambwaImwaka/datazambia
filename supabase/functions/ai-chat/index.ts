
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Get the OpenAI API key from environment variables
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
if (!openAIApiKey) {
  throw new Error('OPENAI_API_KEY is not set');
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
    const { input, messageHistory } = await req.json();
    
    // Enhanced system message for Zambia data analysis
    const systemMessage = {
      role: "system", 
      content: `You are a specialized AI data analyst for the Zambia Data Hub. Your expertise includes:

CORE COMPETENCIES:
- Zambian economic indicators (GDP, inflation, copper prices, agriculture)
- Provincial statistics and demographics across all 10 provinces
- Health metrics (maternal mortality, HIV/AIDS rates, malnutrition, healthcare access)
- Education data (literacy rates, school enrollment, infrastructure)
- Infrastructure development (roads, electricity, telecommunications)
- Mining sector analysis (copper, cobalt, gold production)
- Agricultural statistics (maize production, livestock, food security)
- Government budget allocation and expenditure
- Population demographics and migration patterns

RESPONSE STYLE:
- Provide data-driven insights with specific metrics when possible
- Reference recent trends and historical context
- Suggest data visualizations that would be helpful
- Offer comparative analysis between provinces when relevant
- Include actionable insights for policymakers and researchers

LIMITATIONS:
- When you don't have specific current data, acknowledge this and provide general context
- Suggest where users might find the most current official statistics
- Focus on factual, evidence-based responses

Always prioritize accuracy and relevance to Zambian development and data analysis.`
    };
    
    // Build conversation context from message history
    const messages = [
      systemMessage,
      ...messageHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: input }
    ];
    
    console.log("Sending Zambia-focused request to OpenAI");
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.3, // Lower temperature for more factual responses
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 
      "I'm sorry, I couldn't process your request at the moment.";
    
    console.log("Received Zambia data analysis response");

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in Zambia AI chat function:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while processing your request.",
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
