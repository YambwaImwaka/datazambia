
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple forecasting algorithm (since we can't use Facebook Prophet directly in Edge Functions)
function simpleForecast(data, periodsToForecast) {
  if (!data || data.length < 4) {
    throw new Error('Insufficient data points for forecasting');
  }

  // Calculate average change between data points
  let sum = 0;
  for (let i = 1; i < data.length; i++) {
    sum += data[i].y - data[i - 1].y;
  }
  const avgChange = sum / (data.length - 1);

  // Calculate average seasonality (if applicable)
  const seasonality = data.length >= 12 ? calculateSeasonality(data) : null;

  // Generate forecast
  const forecast = [];
  const lastDataPoint = data[data.length - 1];
  const lastDate = new Date(lastDataPoint.x);

  for (let i = 1; i <= periodsToForecast; i++) {
    const forecastDate = new Date(lastDate);
    forecastDate.setMonth(forecastDate.getMonth() + i);
    
    // Calculate forecasted value: trend + seasonality
    let forecastValue = lastDataPoint.y + (avgChange * i);
    
    // Add seasonality effect if available
    if (seasonality) {
      const monthIndex = forecastDate.getMonth();
      forecastValue += seasonality[monthIndex];
    }
    
    forecast.push({
      x: forecastDate.toISOString().split('T')[0],
      y: forecastValue,
      isForecast: true
    });
  }

  return forecast;
}

function calculateSeasonality(data) {
  // Simple implementation to detect monthly seasonality patterns
  const monthlyAverages = Array(12).fill(0);
  const monthCounts = Array(12).fill(0);
  
  // Group values by month
  for (const point of data) {
    const date = new Date(point.x);
    const month = date.getMonth();
    monthlyAverages[month] += point.y;
    monthCounts[month]++;
  }
  
  // Calculate average per month
  for (let i = 0; i < 12; i++) {
    if (monthCounts[i] > 0) {
      monthlyAverages[i] /= monthCounts[i];
    }
  }
  
  // Calculate overall average
  const overallAvg = monthlyAverages.reduce((sum, val, idx) => 
    monthCounts[idx] > 0 ? sum + val : sum, 0) / 
    monthlyAverages.filter((_, idx) => monthCounts[idx] > 0).length;
  
  // Calculate seasonal effect (difference from overall average)
  return monthlyAverages.map(avg => avg - overallAvg);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { timeSeriesData, periodsToForecast = 6, metricName } = await req.json();
    
    console.log(`Forecasting ${metricName} for ${periodsToForecast} periods ahead`);
    console.log(`Input data points: ${timeSeriesData.length}`);
    
    if (!timeSeriesData || !Array.isArray(timeSeriesData) || timeSeriesData.length < 4) {
      throw new Error('Insufficient data points. At least 4 data points are required for forecasting.');
    }

    // Generate forecast
    const forecast = simpleForecast(timeSeriesData, periodsToForecast);
    
    console.log(`Generated ${forecast.length} forecast points`);

    return new Response(
      JSON.stringify({
        forecast,
        message: `Successfully generated forecast for ${metricName} for the next ${periodsToForecast} periods`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in time series forecasting:", error);
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
