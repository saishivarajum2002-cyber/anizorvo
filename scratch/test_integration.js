const fetch = require('node-fetch');

async function testFullIntegration() {
    console.log('🚀 Starting Full Integration Test (DB + Email)...');
    
    const payload = {
        agentEmail: 'saishivaraju.m2002@gmail.com',
        visit: {
            client_name: 'Auto Tester (Integration)',
            client_email: 'saishivaraju.m2002@gmail.com',
            property_name: 'Skyview Residences',
            visit_date: '2024-05-15',
            visit_time: '02:00 PM',
            status: 'confirmed',
            notes: 'Automated integration test'
        }
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
        
        if (res.ok) {
            console.log('✅ INTEGRATION TEST PASSED!');
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.error('❌ INTEGRATION TEST FAILED:', data);
        }
    } catch (err) {
        console.error('❌ INTEGRATION TEST ERROR:', err.message);
    }
}

testFullIntegration();
