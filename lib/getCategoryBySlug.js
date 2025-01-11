export async function getCategoryBySlug(slug) {
  try {
    const { data } = await api.get("products/categories", {
      slug: slug,
    });

    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}
