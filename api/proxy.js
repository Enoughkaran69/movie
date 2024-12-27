import fetch from 'node-fetch';  // Use the 'import' statement for ES Module

export default async function handler(req, res) {
  // Get the 's' query parameter from the frontend request
  const searchQuery = req.query.s || 'mismatched';  // Default to 'mismatched' if no query is provided
  console.log('Search Query:', searchQuery);
  const url = `https://iosmirror.cc/search.php?s=mismatched`;

  try {
    // Fetch data from the external URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Origin': req.headers.origin || '*',  // Add Origin header for CORS
        'X-Requested-With': 'XMLHttpRequest',  // Add X-Requested-With header
      },
    });

    const data = await response.text();  // Get response as text (adjust if you need JSON)

    // Set the CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  // Allow GET and POST methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow Content-Type header

    // Send the data back to the client
    res.status(200).send(data);
  } catch (error) {
    // Handle errors
    res.status(500).send('Error fetching data');
    console.error('Error fetching data:', error);
  }
}
