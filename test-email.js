const apiKey = 're_eHUJxhSb_5wLvoTCDAvVnir3sYAGQ1bbh';
const targetEmail = 'saishivarajum7@gmail.com'; // Testing to send to the client's custom email

const payload = {
    from: 'Zorvo Realty <info@saiwebservices.in>', // Using the user's verified domain
    to: targetEmail,
    subject: '[ZORVO] Visit Confirmation - Custom Domain Test',
    html: `<div style="font-family:sans-serif; padding:20px; border:1px solid #eee; border-radius:10px">
            <h2 style="color:#f0c040">ZORVO NERVE CENTER</h2>
            <p>Hello! This is a test email sent using your custom domain: saiwebservices.in.</p>
            <p>Since we are using your verified domain, this email successfully reached an external address (${targetEmail})!</p>
            <hr>
            <p style="font-size:12px; color:#888">This is an automated alert from your Zorvo CRM.</p>
           </div>`
};

fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => {
    console.log('Resend API Response:', data);
    if(data.id) {
        console.log('SUCCESS! Email sent to the external client email.');
    } else {
        console.error('FAILED to send email.');
    }
})
.catch(err => {
    console.error('Error:', err);
});
