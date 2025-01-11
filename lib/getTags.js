// Get all tags
export async function getTags() {
  try {
    const { data } = await api.get("products/tags", {
      per_page: 100,
      orderby: "count",
      order: "desc",
    });
    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}
