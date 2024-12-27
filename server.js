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
// In your Express.js API server
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow all methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
    next();
});


// Export the app for Vercel
export default app;
