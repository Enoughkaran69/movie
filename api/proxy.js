import fetch from 'node-fetch';  // Use the 'import' statement for ES Module

export default async function handler(req, res) {
  // Log the entire request to inspect
  console.log('Incoming Request:', req.method, req.url, req.query);

  const searchQuery = req.query.s || 'mismatched';  // Default to 'mismatched' if no query is provided
  console.log('Received query:', searchQuery);  // Log the search query

  const url = `https://iosmirror.cc/search.php?s=${encodeURIComponent(searchQuery)}`;
  console.log('Fetching URL:', url);  // Log the URL to ensure the query is added

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Origin': req.headers.origin || '*',  // Add Origin header for CORS
        'X-Requested-With': 'XMLHttpRequest',  // Add X-Requested-With header
      },
    });

    if (!response.ok) {
      res.status(response.status).send('Error fetching data from external API');
      return;
    }

    const data = await response.text();  // Get response as text (adjust if you need JSON)

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  // Allow GET and POST methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow Content-Type header

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
    console.error('Error fetching data:', error);
  }
}
