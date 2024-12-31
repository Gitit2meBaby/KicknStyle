// app/api/wp/products/route.js
import WooCommerce from "@woocommerce/woocommerce-rest-api";

async function getFeaturedProducts() {
  const api = new WooCommerce({
    url: process.env.WP_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
  });

  try {
    const { data } = await api.get("products", {
      featured: true,
      per_page: 6,
    });
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return null;
  }
}
