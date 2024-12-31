export async function GET() {
  const baseUrl = process.env.WP_URL;

  try {
    // Try to fetch the basic WordPress API endpoint
    const response = await fetch(`${baseUrl}/wp-json/`);
    const textResponse = await response.text();

    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        body: textResponse,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
