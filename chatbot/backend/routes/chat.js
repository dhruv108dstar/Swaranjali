const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/ai');

router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }

        const aiResponse = await generateResponse(history, message);
        
        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Chat API Error:", error);
        res.status(500).json({ error: "Internal server error. Our team is looking into it." });
    }
});

module.exports = router;
