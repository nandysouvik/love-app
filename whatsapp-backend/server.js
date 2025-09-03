const express = require('express');
const cors = require('cors');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
app.use(cors());
app.use(express.json());

let client;

// Initialize WhatsApp client
client = new Client({
    authStrategy: new LocalAuth() // saves session, avoids scanning QR every time
});

// Show QR code in terminal on first run
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📱 Scan the QR code above to log in');
});

client.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');
});

// API endpoint to send WhatsApp message
app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    const number = "917735367592@c.us"; // 🔥 your number hardcoded here

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        await client.sendMessage(number, message);
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('❌ Error sending message:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

client.initialize();

// Start backend server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));