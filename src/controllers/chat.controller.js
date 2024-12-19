import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.API_KEY
}); 

export const handleResponse = async (req, res) => {
    const { prompt, name } = req.body

    if (!prompt) {
        return res.status(400).json({ error: "prompt required" })
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",  
            messages: [
                { role: "system", content: `Let's talk about the recipe ${name}`},
                { role: "user", content: prompt }]
        });

        const responseText = completion.choices[0]?.message?.content.trim();
        if (!responseText) {
            return res.status(500).json({ error: "We couldn't get an answer" })
        }

        res.status(200).json({ response: responseText })
    } catch (err) {
        res.status(500).json({ error: "Error procesing the chat" })
    }
}