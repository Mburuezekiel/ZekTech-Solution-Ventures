import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userQuestion, sessionId } = await req.json();
    
    if (!userQuestion) {
      return new Response(
        JSON.stringify({ error: "User question is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format the message for WhatsApp
    const message = encodeURIComponent(
      `🤖 LYRA-AIDE Support Request\n\n` +
      `Session ID: ${sessionId || 'N/A'}\n\n` +
      `Question: ${userQuestion}\n\n` +
      `Please respond to this customer inquiry.`
    );
    
    const whatsappNumber = "254714487081"; // Format: country code + number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    console.log("WhatsApp fallback triggered for question:", userQuestion);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Question forwarded to WhatsApp support",
        whatsappUrl 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in whatsapp-fallback function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
