import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Create a single instance of the API client
const api = new WooCommerceRestApi({
  url: process.env.WP_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  axiosConfig: {
    timeout: 10000, // 10 second timeout
  },
});

// Get a single product by ID
export async function getProduct(id) {
  try {
    const { data } = await api.get(`products/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get all products with filtering options
export async function getProducts({
  page = 1,
  perPage = 12,
  category = "",
  tag = "",
  search = "",
  orderBy = "date",
  order = "desc",
  onSale = null,
  featured = null,
  minPrice = null,
  maxPrice = null,
} = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
      orderby: orderBy,
      order,
    };

    // Add optional filters
    if (category) params.category = category;
    if (tag) params.tag = tag;
    if (search) params.search = search;
    if (onSale !== null) params.on_sale = onSale;
    if (featured !== null) params.featured = featured;
    if (minPrice !== null) params.min_price = minPrice;
    if (maxPrice !== null) params.max_price = maxPrice;

    const { data, headers } = await api.get("products", { params });

    // Return both the products and pagination info
    return {
      products: data,
      totalPages: parseInt(headers["x-wp-totalpages"] || "1"),
      totalProducts: parseInt(headers["x-wp-total"] || "0"),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 0, totalProducts: 0 };
  }
}

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

// Get all attributes
export async function getAttributes() {
  try {
    const { data } = await api.get("products/attributes");
    return data;
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return [];
  }
}

// Get attribute terms (e.g., all sizes or all colors)
export async function getAttributeTerms(attributeId) {
  try {
    const { data } = await api.get(`products/attributes/${attributeId}/terms`, {
      per_page: 100,
    });
    return data;
  } catch (error) {
    console.error("Error fetching attribute terms:", error);
    return [];
  }
}

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
