export async function getProductsByCategory(
  categoryId,
  page = 1,
  perPage = 12
) {
  try {
    const { data, headers } = await api.get("products", {
      category: categoryId,
      page,
      per_page: perPage,
      status: "publish",
    });

    return {
      products: data,
      totalPages: parseInt(headers["x-wp-totalpages"] || "1"),
      totalProducts: parseInt(headers["x-wp-total"] || "0"),
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return { products: [], totalPages: 0, totalProducts: 0 };
  }
}
