const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/proxy', async (req, res) => {
    const query = req.query.s;
    const response = await fetch(`https://iosmirror.cc/search.php?s=${query}`);
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
