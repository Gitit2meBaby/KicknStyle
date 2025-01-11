// Get all categories with optional parent
export async function getCategories(parent = null) {
  try {
    const params = {
      per_page: 100,
      hide_empty: true,
      orderby: "name",
      order: "asc",
    };

    if (parent !== null) {
      params.parent = parent;
    }

    const { data } = await api.get("products/categories", { params });
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
