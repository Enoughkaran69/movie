const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/proxy', async (req, res) => {
  const url = 'https://iosmirror.cc/search.php?s=mismatched';
  
  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data); // Send the data back to the client
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
