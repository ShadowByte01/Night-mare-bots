import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactRequest {
  discordId: string;
  projectDescription: string;
  email?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { discordId, projectDescription, email }: ContactRequest = await req.json();

    if (!discordId || !projectDescription) {
      return new Response(
        JSON.stringify({ error: "Discord ID and project description are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: settings } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "discord_webhook")
      .maybeSingle();

    const webhookUrl = settings?.value?.url;

    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ error: "Webhook not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const embed = {
      title: "🔔 New Contact Request",
      color: 0xFF3366,
      fields: [
        {
          name: "Discord ID",
          value: discordId,
          inline: true,
        },
        {
          name: "Email",
          value: email || "Not provided",
          inline: true,
        },
        {
          name: "Project Description",
          value: projectDescription.substring(0, 1024),
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Nightmare Bots Contact Form",
      },
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error("Failed to send webhook");
    }

    await supabase.from("contact_messages").insert({
      discord_id: discordId,
      project_description: projectDescription,
      email: email || "",
      status: "pending",
    });

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully!" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
