// Search products
export async function searchProducts(query, page = 1, perPage = 12) {
  try {
    const { data, headers } = await api.get("products", {
      params: {
        search: query,
        page,
        per_page: perPage,
        status: "publish",
      },
    });

    return {
      products: data,
      totalPages: parseInt(headers["x-wp-totalpages"] || "1"),
      totalProducts: parseInt(headers["x-wp-total"] || "0"),
    };
  } catch (error) {
    console.error("Error searching products:", error);
    return { products: [], totalPages: 0, totalProducts: 0 };
  }
}
