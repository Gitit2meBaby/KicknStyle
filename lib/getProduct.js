import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

async function getProduct(id) {
  const api = new WooCommerceRestApi({
    url: process.env.WP_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
  });

  try {
    const { data } = await api.get(`products/${id}`);
    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default getProduct;
