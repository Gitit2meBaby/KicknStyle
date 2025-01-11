// Get all possible slugs for static paths
export async function getAllProductSlugs() {
  try {
    const { data } = await api.get("products", {
      per_page: 100, // Adjust based on your needs
      status: "publish",
      fields: "slug", // Only fetch the slugs
    });

    return data.map((product) => product.slug);
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
}
