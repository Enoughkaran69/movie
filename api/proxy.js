import fetch from 'node-fetch';  // Use the 'import' statement for ES Module

export default async function handler(req, res) {
    // Get the query parameter from the frontend request
    const searchQuery = req.query.s || 'mismatched';  // Default to 'mismatched' if no query is provided
    console.log('Received query:', searchQuery);  // Log the received query

    // Construct the URL to the external API with the query parameter
    const url = `https://iosmirror.cc/search.php?s=${encodeURIComponent(searchQuery)}`;
    console.log('Fetching URL:', url);  // Log the URL to ensure the query is added

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Origin': req.headers.origin || '*',  // Allow all origins (CORS)
                'X-Requested-With': 'XMLHttpRequest',  // Add X-Requested-With header to mimic an AJAX request
            },
        });

        // Check if the response is valid (status code 200)
        if (!response.ok) {
            res.status(response.status).send('Error fetching data from external API');
            return;
        }

        // Get response as text (adjust if the response is in JSON format)
        const data = await response.text();  

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  // Allow GET and POST methods
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow Content-Type header

        // Send the data back to the client
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
        console.error('Error fetching data:', error);
    }
}
