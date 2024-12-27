// api/proxy.js

import fetch from 'node-fetch';  // Use the 'import' statement for ES Module

export default async function handler(req, res) {
  const url = 'https://iosmirror.cc/search.php?s=mismatched';  // The URL you're fetching data from

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
    
    // Send the data back to the client
    res.status(200).send(data);
  } catch (error) {
    // Handle errors
    res.status(500).send('Error fetching data');
    console.error('Error fetching data:', error);
  }
}
