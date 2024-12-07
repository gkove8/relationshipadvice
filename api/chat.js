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
    // Log the request body and environment variable (without exposing the actual key)
    console.log('Request body:', req.body);
    console.log('API key exists:', !!process.env.ANTHROPIC_API_KEY);

    // Simple test response
    return res.status(200).json({
      message: "This is a test response. If you see this, the API endpoint is working."
    });
  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
