import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/proxy', async (req, res) => {
    const query = req.query.s;
    try {
        const response = await fetch(`https://iosmirror.cc/search.php?s=${query}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the app for Vercel
export default app;
