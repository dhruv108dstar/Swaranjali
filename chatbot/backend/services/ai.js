const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are Sahara AI, a compassionate and confidential mental wellness assistant for young people in India.

Your role:
- Listen empathetically and provide a safe space.
- Offer emotional support and validate their feelings.
- Suggest healthy coping techniques like 4-7-8 breathing, grounding exercises (5-4-3-2-1), or simple mindfulness.
- Gently encourage seeking professional help when appropriate.

Important rules:
- NEVER provide a medical diagnosis or prescribe treatment.
- NEVER encourage harmful behavior.
- If the user expresses suicidal thoughts, self-harm, or extreme crisis, immediately, empathetically, and clearly suggest contacting helplines. Provide these Indian helplines: Vandrevala Foundation (9999 666 555), Aasra (9820466726), Kiran (1800-599-0019).
- Respond in a warm, supportive, and conversational tone. Act like a supportive peer, not a robot.
- Keep responses concise, easily readable, and interactive.
- Use simple English, sometimes mixing a bit of supportive Roman Hindi phrases like "Main samajh raha hoon" (I understand) or "Sab theek ho jayega" (Everything will be fine) if appropriate, to build cultural connection.
`;

const generateResponse = async (history, userMessage) => {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_PROMPT,
        });

        // Format history for @google/generative-ai
        let formattedHistory = [];
        if (history && Array.isArray(history)) {
            // Filter out system prompt parts if any from previous structure
            formattedHistory = history
                .filter(msg => msg.role === 'user' || msg.role === 'model')
                .map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                }));
            
            // Gemini API requires history to start with a 'user' message
            if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
                formattedHistory.unshift({ role: 'user', parts: [{ text: 'Hello' }] });
            }
        }

        const chatSession = model.startChat({
            history: formattedHistory,
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
            }
        });

        const result = await chatSession.sendMessage(userMessage);
        return result.response.text();
    } catch (error) {
        console.error("Gemini AI API Error:", error);
        throw new Error("Failed to generate AI response.");
    }
};

module.exports = {
    generateResponse
};
