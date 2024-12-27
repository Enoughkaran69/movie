const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/search', (req, res) => {
    // Your response data
    res.json({ message: "Data from API" });
});
app.get('/', (req, res) => {
  res.send('Hello, Node.js app is deployed on Vercel!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
