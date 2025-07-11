
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const XAI_API_KEY = Deno.env.get('XAI_API_KEY');
const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

interface AIProvider {
  name: string;
  apiKey: string;
  baseUrl: string;
  model: string;
}

const providers: Record<string, AIProvider> = {
  openai: {
    name: 'OpenAI',
    apiKey: OPENAI_API_KEY || '',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini'
  },
  grok: {
    name: 'Grok',
    apiKey: XAI_API_KEY || '',
    baseUrl: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-beta'
  },
  deepseek: {
    name: 'DeepSeek',
    apiKey: DEEPSEEK_API_KEY || '',
    baseUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat'
  }
};

async function callAI(provider: AIProvider, messages: any[], temperature = 0.3) {
  if (!provider.apiKey) {
    throw new Error(`${provider.name} API key not configured`);
  }

  const response = await fetch(provider.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${provider.apiKey}`
    },
    body: JSON.stringify({
      model: provider.model,
      messages: messages,
      temperature: temperature,
      max_tokens: 800
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`${provider.name} API error: ${response.status} ${errorData}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request.";
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input, messageHistory, preferredProvider = 'grok' } = await req.json();
    
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
    
    const messages = [
      systemMessage,
      ...messageHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: input }
    ];
    
    console.log(`Using ${preferredProvider} AI for Zambia data analysis`);
    
    // Try preferred provider first, then fallback to others
    const providerOrder = [preferredProvider, 'grok', 'deepseek', 'openai'].filter((p, i, arr) => arr.indexOf(p) === i);
    
    let response = '';
    let usedProvider = '';
    
    for (const providerName of providerOrder) {
      const provider = providers[providerName];
      if (!provider || !provider.apiKey) continue;
      
      try {
        response = await callAI(provider, messages);
        usedProvider = provider.name;
        console.log(`Successfully used ${provider.name} for analysis`);
        break;
      } catch (error) {
        console.warn(`${provider.name} failed:`, error.message);
        continue;
      }
    }
    
    if (!response) {
      throw new Error('All AI providers failed');
    }

    return new Response(
      JSON.stringify({ 
        response,
        provider: usedProvider
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in multi-AI chat function:", error);
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
