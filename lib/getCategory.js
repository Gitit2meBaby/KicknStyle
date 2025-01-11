// Get category by ID
export async function getCategory(id) {
  try {
    const { data } = await api.get(`products/categories/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}
