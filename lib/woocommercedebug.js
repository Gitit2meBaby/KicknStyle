export async function debugWooCommerce() {
  const baseUrl = process.env.WP_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  console.log("=== WooCommerce Debug Information ===");

  // Check environment variables
  console.log("\nEnvironment Variables:");
  console.log("WP_URL:", baseUrl ? "✓ Set" : "❌ Missing");
  console.log("WC_CONSUMER_KEY:", consumerKey ? "✓ Set" : "❌ Missing");
  console.log("WC_CONSUMER_SECRET:", consumerSecret ? "✓ Set" : "❌ Missing");

  // Test basic WordPress connection
  console.log("\nTesting WordPress Connection:");
  try {
    const wpResponse = await fetch(`${baseUrl}/wp-json/`);
    console.log("WordPress API Status:", wpResponse.status);
    console.log(
      "WordPress API Response:",
      (await wpResponse.text().slice(0, 100)) + "..."
    );
  } catch (error) {
    console.error("WordPress Connection Error:", error.message);
  }

  // Test WooCommerce connection
  console.log("\nTesting WooCommerce Connection:");
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );
    const wooResponse = await fetch(
      `${baseUrl}/wp-json/wc/v3/products?per_page=1`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("WooCommerce API Status:", wooResponse.status);
    const wooData = await wooResponse.json();
    console.log("WooCommerce Response:", JSON.stringify(wooData, null, 2));
  } catch (error) {
    console.error("WooCommerce Connection Error:", error.message);
  }
}

// Add this to your getProducts function
export async function getProducts(perPage = 20, page = 1) {
  try {
    await debugWooCommerce(); // Run debug first

    console.log("\nFetching products with params:", {
      perPage,
      page,
      url: `${process.env.WP_URL}/wp-json/wc/v3/products`,
    });

    const products = await fetchWooCommerceAPI(
      `products?per_page=${perPage}&page=${page}&status=publish`
    );

    console.log("Products count:", products?.length || 0);

    if (!products || !Array.isArray(products)) {
      console.error("Invalid products response:", products);
      throw new Error("Invalid products response");
    }

    return products;
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
}
