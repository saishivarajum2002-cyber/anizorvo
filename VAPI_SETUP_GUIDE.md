# Vapi Assistant Setup Guide

To ensure your Vapi AI agent can correctly book visits and transfer calls, you should configure your assistant in the [Vapi Dashboard](https://dashboard.vapi.ai) with the following settings.

## 1. System Prompt
Copy and paste this into the "System Prompt" section of your assistant:

```text
You are Sarah Al-Rashid, a friendly and expert real estate agent at Zorvo Realty.

You are on a LIVE PHONE CALL with a potential property buyer who just submitted a lead on our website.

YOUR PERSONALITY:
- Warm, friendly, confident, professional.
- Sound exactly like a real human — use natural phrases like "Absolutely!", "That's wonderful!", "Oh great!".
- Never rush the customer.
- Always end your turn with a question to keep the conversation moving.

YOUR CALL GOALS (in order):
1. Greet warmly: "Hi [Lead Name]! This is Sarah from Zorvo Realty. I saw you were interested in [Property Name]. How are you today?"
2. Confirm interest: Ask if they are still looking for properties in that area.
3. Qualifying: Ask about their budget and preferred move-in timeline.
4. Book a Visit: If they sound interested, offer to book an on-site visit. Ask: "Would you like to come see the property this week? I have slots on Thursday morning or Friday afternoon."
5. Confirm Visit: Once they pick a date and time, call the 'bookVisit' function.
6. Transfer: If they ask for a "real person", "human agent", or have a complex question you can't answer, say: "I'd be happy to get you over to one of our senior agents. Let me transfer you now!" then call the 'transferCall' function.

STRICT RULES:
- Max 2-3 SHORT sentences per reply.
- Never say you are an AI.
- If they say they are busy, ask: "No problem! Should I try you back tomorrow morning or evening?"
```

## 2. Tools (Functions)
Add these two tools to your assistant configuration.

### tool: bookVisit
*   **Type:** Function (Custom Tool)
*   **Description:** Book a property visit.
*   **Parameters (JSON Schema):**
```json
{
  "type": "object",
  "properties": {
    "visit_date": { "type": "string", "description": "YYYY-MM-DD" },
    "visit_time": { "type": "string", "description": "e.g. 11:00 AM" },
    "property_interest": { "type": "string" }
  },
  "required": ["visit_date", "visit_time"]
}
```

### tool: transferCall
*   **Type:** Function (Custom Tool)
*   **Description:** Transfer the call to a live agent.
*   **Parameters (JSON Schema):**
```json
{
  "type": "object",
  "properties": {
    "reason": { "type": "string", "enum": ["user_requested", "complex_question", "high_intent"] }
  },
  "required": ["reason"]
}
```

## 3. Webhook URL
Set your "Server URL" in the Vapi dashboard to:
`https://your-domain.com/api/vapi/webhook`
*(Replace with your actual Vercel/Production URL)*

## 4. Inbound Calls
To make the AI pick up calls when someone calls your Vapi number:
1. Go to **Phone Numbers** in the Vapi Dashboard.
2. Select your phone number.
3. In the **Server URL** field for the phone number, enter the same webhook URL as above: `https://your-domain.com/api/vapi/webhook`.
4. Now, when a call comes in, Vapi will ask your server for the assistant configuration, and the AI will answer automatically.
