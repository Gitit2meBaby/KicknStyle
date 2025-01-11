export async function getAllCategorySlugs() {
  try {
    const { data } = await api.get("products/categories", {
      per_page: 100,
      fields: "slug",
    });

    return data.map((category) => category.slug);
  } catch (error) {
    console.error("Error fetching category slugs:", error);
    return [];
  }
}
