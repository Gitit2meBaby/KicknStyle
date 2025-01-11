export async function getProductBySlug(slug) {
  try {
    const { data } = await api.get("products", {
      slug: slug,
      status: "publish",
    });

    // WooCommerce returns an array, but we need just the first item
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
