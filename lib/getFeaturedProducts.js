// Get featured products
export async function getFeaturedProducts(limit = 6) {
  try {
    const { data } = await api.get("products", {
      params: {
        featured: true,
        per_page: limit,
        status: "publish",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
