import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Missing API key');
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: messages,
      system: "You are a compassionate and knowledgeable relationship advisor. Provide thoughtful, balanced advice while maintaining appropriate boundaries. Focus on healthy relationship dynamics, communication, and emotional well-being. Avoid giving medical advice or addressing situations involving abuse or harm - in those cases, direct users to appropriate professional resources."
    });

    return res.status(200).json({
      message: response.content[0].text
    });
  } catch (error) {
    console.error('Error in chat handler:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
