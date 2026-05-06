const fetch = require('node-fetch');

async function reproduceHang() {
    console.log('🚀 Attempting to reproduce hang...');
    
    const visit = {
        client_name: 'anitha',
        client_phone: '9900744658',
        client_email: 'anitha.m1117@gmail.com',
        property_name: 'Skyview Residences',
        visit_date: '2026-05-04',
        visit_time: '11:00',
        qualification_token: 'dummy_token', // It might fail if tokens are checked
        agreement_token: 'dummy_token'
    };

    const payload = {
        agentEmail: 'saishivaraju.m2002@gmail.com',
        visit: visit
    };

    try {
        console.log('📡 Sending request to /api/visits...');
        const res = await fetch('http://localhost:5000/api/visits', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-secret': 'zorvo_secret_2026'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log('✅ Response:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

reproduceHang();
