
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const XAI_API_KEY = Deno.env.get('XAI_API_KEY');
const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

function simpleForecast(data: any[], periodsToForecast: number) {
  if (!data || data.length < 4) {
    throw new Error('Insufficient data points for forecasting');
  }

  let sum = 0;
  for (let i = 1; i < data.length; i++) {
    sum += data[i].y - data[i - 1].y;
  }
  const avgChange = sum / (data.length - 1);

  const forecast = [];
  const lastDataPoint = data[data.length - 1];
  const lastDate = new Date(lastDataPoint.x);

  for (let i = 1; i <= periodsToForecast; i++) {
    const forecastDate = new Date(lastDate);
    forecastDate.setMonth(forecastDate.getMonth() + i);
    
    let forecastValue = lastDataPoint.y + (avgChange * i);
    
    forecast.push({
      x: forecastDate.toISOString().split('T')[0],
      y: Math.round(forecastValue * 100) / 100,
      isForecast: true
    });
  }

  return forecast;
}

async function getAIInsights(data: any[], metricName: string, forecast: any[], provider: 'grok' | 'deepseek' = 'deepseek') {
  const apiKey = provider === 'grok' ? XAI_API_KEY : DEEPSEEK_API_KEY;
  const baseUrl = provider === 'grok' ? 'https://api.x.ai/v1/chat/completions' : 'https://api.deepseek.com/v1/chat/completions';
  const model = provider === 'grok' ? 'grok-beta' : 'deepseek-chat';

  if (!apiKey) {
    return "AI insights unavailable - API key not configured";
  }

  const recentData = data.slice(-6);
  const prompt = `Analyze this Zambian economic data for ${metricName}:

Historical data (last 6 periods): ${JSON.stringify(recentData)}
AI forecast (next periods): ${JSON.stringify(forecast)}

Provide a brief analysis covering:
1. Key trends observed in historical data
2. Forecast implications for Zambia's economy
3. Potential risks or opportunities
4. Context specific to Zambia's economic situation

Keep response under 150 words and focus on actionable insights.`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are an expert economist specializing in Zambian economic analysis. Provide concise, data-driven insights." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`${provider} API error: ${response.status}`);
    }

    const aiData = await response.json();
    return aiData.choices?.[0]?.message?.content || "AI analysis unavailable";
  } catch (error) {
    console.warn(`${provider} AI insights failed:`, error.message);
    return provider === 'grok' ? await getAIInsights(data, metricName, forecast, 'deepseek') : "AI insights currently unavailable";
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { timeSeriesData, periodsToForecast = 6, metricName } = await req.json();
    
    console.log(`AI-enhanced forecasting ${metricName} for ${periodsToForecast} periods`);
    
    if (!timeSeriesData || !Array.isArray(timeSeriesData) || timeSeriesData.length < 4) {
      throw new Error('Insufficient data points. At least 4 data points are required for forecasting.');
    }

    const forecast = simpleForecast(timeSeriesData, periodsToForecast);
    const aiInsights = await getAIInsights(timeSeriesData, metricName, forecast);
    
    console.log(`Generated ${forecast.length} forecast points with AI insights`);

    return new Response(
      JSON.stringify({
        forecast,
        aiInsights,
        message: `AI-enhanced forecast generated for ${metricName}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in AI-enhanced forecasting:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while generating the forecast",
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
