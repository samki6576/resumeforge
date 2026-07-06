const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Groq = require('groq-sdk');

// Initialize Groq client
let groq;
try {
    groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
} catch (error) {
    console.error('Groq initialization error:', error.message);
}

// Generate bullet points
router.post('/generate-bullets', auth, async (req, res) => {
    try {
        const { jobTitle, company, description } = req.body;

        if (!jobTitle || !company || !description) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: jobTitle, company, description'
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(400).json({
                success: false,
                message: 'GROQ_API_KEY is not configured'
            });
        }

        console.log('Generating bullet points for:', jobTitle, 'at', company);

        const prompt = 'Generate 4-5 professional bullet points for a ' + jobTitle + ' at ' + company + '. Description: ' + description + '. Return ONLY a JSON array of strings.';

        const completion = await groq.chat.completions.create({
            model: process.env.LLM_MODEL || 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional resume writer. Generate concise, achievement-oriented bullet points.'
                },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        const response = completion.choices[0].message.content;
        let bulletPoints = [];

        try {
            bulletPoints = JSON.parse(response);
        } catch (e) {
            bulletPoints = response.split('\n')
                .filter(line => line.trim())
                .map(line => line.replace(/^[\d-]+\.\s*/, '').trim());
        }

        if (!bulletPoints.length) {
            bulletPoints = [response];
        }

        console.log('Generated', bulletPoints.length, 'bullet points');
        res.json({ success: true, bulletPoints });

    } catch (error) {
        console.error('AI Generation Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate bullet points',
            error: error.message
        });
    }
});

// Generate summary
router.post('/generate-summary', auth, async (req, res) => {
    try {
        const { experience, skills, goals } = req.body;

        let prompt = 'Write a professional resume summary (3-4 sentences) for a candidate with:\nExperience: ' + experience + '\nSkills: ' + skills;
        if (goals) {
            prompt += '\nCareer Goals: ' + goals;
        }

        const completion = await groq.chat.completions.create({
            model: process.env.LLM_MODEL || 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'You are a professional resume writer.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 200,
        });

        res.json({ success: true, summary: completion.choices[0].message.content.trim() });

    } catch (error) {
        console.error('Summary Generation Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Suggest skills
router.post('/suggest-skills', auth, async (req, res) => {
    try {
        const { jobTitle } = req.body;

        const prompt = 'Suggest 10-15 relevant skills for a ' + jobTitle + ' position.\nReturn as JSON object with categories.';

        const completion = await groq.chat.completions.create({
            model: process.env.LLM_MODEL || 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'You are a career advisor.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 300,
        });

        let skills = {};
        try {
            skills = JSON.parse(completion.choices[0].message.content);
        } catch (e) {
            skills = {
                'Suggested Skills': completion.choices[0].message.content
                    .split('\n')
                    .filter(s => s.trim())
            };
        }

        res.json({ success: true, skills });

    } catch (error) {
        console.error('Skills Suggestion Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
