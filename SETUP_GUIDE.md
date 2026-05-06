# PropEdge — Complete Setup Guide

## Full System Flow

```
Lead fills form on website
        ↓
Vercel API saves lead + assigns agent
        ↓
VAPI automatically calls lead (no phone needed)
        ↓
AI (Priya) talks, qualifies, books visit
        ↓
Booking saved → WhatsApp confirmation sent
        ↓
Auto follow-up: Day 0, 1, 2, 3 via WhatsApp
        ↓
Everything visible in dashboard
```

---

## Step 1 — Supabase Tables

1. Go to supabase.com → SQL Editor
2. Paste and run `SUPABASE_TABLES.sql`

---

## Step 2 — VAPI Setup (Free)

1. Sign up at **dashboard.vapi.ai**
2. Create a Phone Number → copy `VAPI_PHONE_NUMBER_ID`
3. Create an Assistant → copy `VAPI_ASSISTANT_ID`
4. In Assistant settings → Server URL:
   ```
   https://your-project.vercel.app/api/vapi/webhook
   ```
5. Copy your API key → `VAPI_API_KEY`

---

## Step 3 — Vercel Env Vars

Add all vars from `.env.example` in Vercel dashboard → Settings → Environment Variables

**Minimum required to work:**
```
VAPI_API_KEY
VAPI_ASSISTANT_ID
VAPI_PHONE_NUMBER_ID
GEMINI_API_KEY
BASE_URL
AGENT_EMAIL
API_SECRET
```

---

## Step 4 — WhatsApp Bridge (on your Android phone)

```bash
# In Termux:
cd whatsapp-bridge
npm install
pip install flask requests --break-system-packages
bash start.sh
```

Then open: `http://localhost:3001/qr` → scan with WhatsApp

Set in Vercel:
```
WA_BRIDGE_URL=http://YOUR_PHONE_IP:3001
```

For global access use ngrok:
```bash
ngrok http 3001
# WA_BRIDGE_URL=https://abc123.ngrok.io
```

---

## Step 5 — Mobile App

```bash
cd mobile-app
npm install
npx expo start   # Scan QR with Expo Go
```

Or build APK:
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

Update `BACKEND_URL` in `mobile-app/App.js` to your Vercel URL.

---

## Step 6 — Test Full Flow

```
1. Open dashboard → Settings → save your agent profile
2. Add a property in Portfolio
3. Add a lead manually → VAPI calls them instantly
4. Or fill your website form → same result
5. Check Calls panel for VAPI call logs
6. Check Follow-Ups panel for WA sequences
```

---

## API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/leads | New lead → triggers VAPI call |
| POST | /api/vapi/webhook | VAPI events (booking, transcript) |
| GET  | /api/vapi/calls | List recent calls |
| GET  | /api/vapi/status | Check VAPI connection |
| POST | /api/visits | Save visit booking |
| GET  | /api/report | Team performance report |
| GET  | /api/followups | List active WA sequences |
| POST | /api/team/agents | Add team agent |
| GET  | /api/whatsapp/status | Check WA bridge |

---

## How VAPI Webhook Works

VAPI sends events to `/api/vapi/webhook`:

- `call-started` → marks lead as "contacted"
- `function-call: bookVisit` → saves booking + sends WhatsApp
- `function-call: transferCall` → alerts agent via WhatsApp
- `end-of-call-report` → saves transcript + schedules follow-ups
- No answer → retry in 5m, 15m, 30m automatically
