const fetch = require('node-fetch');

async function testEmailProxy() {
    console.log('🚀 Starting Email Proxy Auto-Test...');
    
    const payload = {
        to: 'saishivaraju.m2002@gmail.com', // Using the user's email from .env
        subject: '🧪 ZORVO AUTO-TEST: Email Pipeline',
        message: 'This is an automated test of the Zorvo Email Pipeline. If you receive this, the system is fully operational.',
        html: `
            <div style="font-family:sans-serif; padding:20px; background:#05070a; color:#dee4ed; border:1px solid #f0c040; border-radius:10px">
                <h2 style="color:#f0c040">ZORVO SYSTEM TEST</h2>
                <p>The backend email proxy is working correctly. ✅</p>
                <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                <hr style="border-color:rgba(255,255,255,0.1)">
                <p style="font-size:12px; color:#8b9bb4">Test ID: ${Math.random().toString(36).substring(7)}</p>
            </div>
        `
    };

    try {
        console.log('📡 Sending request to /api/send-email...');
        const res = await fetch('http://localhost:5000/api/send-email', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-secret': 'zorvo_secret_2026'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        
        if (res.ok && data.success) {
            console.log('✅ TEST PASSED: Email dispatched successfully!');
            console.log('ID:', data.data?.id);
        } else {
            console.error('❌ TEST FAILED:', data);
        }
    } catch (err) {
        console.error('❌ TEST ERROR:', err.message);
    }
}

testEmailProxy();
