import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert medical AI assistant specialized in analyzing kidney scan images (ultrasound and CT scans). Your role is to provide educational analysis of kidney images.

IMPORTANT: You are NOT providing medical diagnosis. You are providing educational information about what you observe in the image.

When analyzing a kidney scan image, you must:
1. Identify the type of scan (ultrasound or CT)
2. Analyze the kidney structure and any visible abnormalities
3. Classify the finding into one of these categories:
   - NORMAL: Healthy kidney tissue with no visible abnormalities
   - CYST: Fluid-filled sac in the kidney (typically appears as dark, round area)
   - STONE: Mineral deposits (typically appears as bright/white spots)
   - TUMOR: Abnormal tissue growth (may appear as irregular mass)

You MUST respond with a valid JSON object in this exact format:
{
  "classification": "NORMAL" | "CYST" | "STONE" | "TUMOR",
  "confidence": <number between 0 and 100>,
  "scanType": "ultrasound" | "ct" | "unknown",
  "findings": "<brief description of what you observe>",
  "affectedRegion": "<description of which part of kidney is affected, if any>",
  "recommendations": ["<list of general health recommendations>"]
}

Be conservative in your analysis. If the image is unclear or not a kidney scan, set classification to "NORMAL" with low confidence and explain in findings.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, bp, glucose, notes } = await req.json();

    if (!imageBase64) {
      console.error("No image provided");
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Processing kidney scan analysis request");
    console.log("Additional data - BP:", bp, "Glucose:", glucose, "Notes:", notes);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build context with optional vitals
    let userMessage = "Please analyze this kidney scan image and provide your assessment in the specified JSON format.";
    if (bp || glucose || notes) {
      userMessage += "\n\nAdditional patient information:";
      if (bp) userMessage += `\n- Blood Pressure: ${bp}`;
      if (glucose) userMessage += `\n- Glucose Level: ${glucose} mg/dL`;
      if (notes) userMessage += `\n- Patient Notes: ${notes}`;
    }

    console.log("Sending request to Lovable AI Gateway");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: userMessage },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to analyze image" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("AI Gateway response received");

    const aiResponse = data.choices?.[0]?.message?.content;
    if (!aiResponse) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "No analysis generated" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from the AI
    let analysisResult;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      let jsonStr = aiResponse;
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
      }
      analysisResult = JSON.parse(jsonStr);
      console.log("Successfully parsed AI analysis:", analysisResult);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw response:", aiResponse);
      
      // Return a default response if parsing fails
      analysisResult = {
        classification: "NORMAL",
        confidence: 50,
        scanType: "unknown",
        findings: "Unable to fully analyze the image. Please ensure you've uploaded a clear kidney scan.",
        affectedRegion: "N/A",
        recommendations: [
          "Consult a healthcare professional for proper diagnosis",
          "Ensure the scan image is clear and properly oriented"
        ]
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        analysis: analysisResult,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error("Error in analyze-kidney-scan:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
