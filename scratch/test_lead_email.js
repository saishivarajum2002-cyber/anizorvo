/**
 * Test: New Lead → Agent Email Notification
 * Run: node scratch/test_lead_email.js
 *
 * Tests the full pipeline:
 *   1. POST /api/leads  →  saves lead + sends agent email
 *   2. Logs result clearly so you can verify inbox
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
const API_SECRET = process.env.API_SECRET || 'zorvo_secret_2026';
const AGENT_EMAIL = process.env.AGENT_EMAIL || 'saishivaraju.m2002@gmail.com';

const testLead = {
  name: 'Test Lead Auto',
  phone: '+919900744658',
  email: 'anitha.m1117@gmail.com',          // client email (for auto-responder)
  property_interest: 'Luxury Villa',
  budget: '$1M - $3M',
  bhk_preference: '3 BHK',
  pre_approval_status: 'yes',
  notes: 'Automated test lead — please ignore',
  status: 'New',
  source: 'Auto Test',
  pipeline_stage: 'New',
  score: 85
};

async function run() {
  console.log('\n🧪 Testing lead notification email...');
  console.log(`   API:   ${BASE_URL}/api/leads`);
  console.log(`   Agent: ${AGENT_EMAIL}`);
  console.log(`   Lead:  ${testLead.name} <${testLead.email}>\n`);

  try {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': API_SECRET
      },
      body: JSON.stringify({
        agentEmail: AGENT_EMAIL,
        lead: testLead,
        autoRespond: true   // also sends auto-reply to the lead's email
      })
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Lead saved successfully');
      console.log('   Email sent:', data.emailSent ?? '(check server logs)');
      console.log('\n📬 Check inbox:', AGENT_EMAIL);
      console.log('📬 Client auto-reply sent to:', testLead.email);
    } else {
      console.error('❌ API error:', res.status, data);
    }
  } catch (e) {
    console.error('❌ Request failed:', e.message);
    console.log('\n💡 Make sure the server is running:  node api/index.js');
  }
}

run();
