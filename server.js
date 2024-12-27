const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Node.js app with CORS support!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
