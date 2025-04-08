export async function GET() {
  // Define a GET handler for the API route
  try {
    const response = await fetch('https://api.frontendexpert.io/api/fe/wordle-words') ;
    // Fetch words from the external API
    const data = await response.json();
    // Parse the JSON response
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      // Return the data with proper JSON content type
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch words' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      // Return error response if fetch fails
    });
  }
}