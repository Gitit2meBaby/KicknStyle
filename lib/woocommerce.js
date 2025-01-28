console.log("WooCommerce initialization starting...", {
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL ? "Set" : "Not Set",
  consumerKey: process.env.WC_CONSUMER_KEY ? "Set" : "Not Set",
  consumerSecret: process.env.WC_CONSUMER_SECRET ? "Set" : "Not Set",
});

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_URL is not defined");
}

if (!process.env.WC_CONSUMER_KEY) {
  throw new Error("WC_CONSUMER_KEY is not defined");
}

if (!process.env.WC_CONSUMER_SECRET) {
  throw new Error("WC_CONSUMER_SECRET is not defined");
}

// Custom axios config to remove problematic headers
const axiosConfig = {
  headers: {
    common: {}, // Remove default headers
  },
};

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  axiosConfig, // Apply the custom config
});

// Remove the User-Agent header from future requests
if (api.axiosInstance?.defaults?.headers) {
  delete api.axiosInstance.defaults.headers["User-Agent"];
}

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

// Get categories with featured image for home page
export async function getCategoriesWithFeaturedImage() {
  try {
    const params = {
      per_page: 100,
      hide_empty: true,
      orderby: "name",
      order: "asc",
    };

    // Get categories first
    const { data: categories } = await api.get("products/categories", {
      params,
    });

    // Keep track of used images to avoid duplicates
    const usedImages = new Set();

    // For each category, get products until we find one with an unused image
    const categoriesWithImages = await Promise.all(
      categories.map(async (category) => {
        // Get multiple products for this category to have more image options
        const { data: products } = await api.get("products", {
          params: {
            category: category.id,
            per_page: 10, // Fetch more products to have more image options
            status: "publish",
            _fields: "images", // Only fetch image data
          },
        });

        // Find the first product with an unused image
        let featuredImage = null;
        for (const product of products) {
          const imageUrl = product?.images[0]?.src;
          if (imageUrl && !usedImages.has(imageUrl)) {
            featuredImage = imageUrl;
            usedImages.add(imageUrl);
            break;
          }
        }

        // If no unused image found, use the first available image as fallback
        if (!featuredImage && products[0]?.images[0]?.src) {
          featuredImage = products[0].images[0].src;
          usedImages.add(featuredImage);
        }

        return {
          ...category,
          featuredImage,
        };
      })
    );

    // Filter out categories without images
    return categoriesWithImages.filter((category) => category.featuredImage);
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    return [];
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
  categorySlug,
  page = 1,
  perPage = 12
) {
  try {
    // First get category ID from slug
    const { data: categories } = await api.get("products/categories", {
      slug: categorySlug,
    });

    if (!categories.length) {
      throw new Error("Category not found");
    }

    const categoryId = categories[0].id;

    // Then get products using category ID
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

export async function getProductBySlug(slug) {
  try {
    // First get the product
    const response = await api.get("products", {
      slug: slug,
    });

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const product = response.data[0];

    // If it's a variable product, fetch its variations
    if (product.type === "variable") {
      try {
        const variationsResponse = await api.get(
          `products/${product.id}/variations`,
          {
            per_page: 100, // Adjust this number based on your needs
          }
        );

        console.log("Fetched variations:", variationsResponse.data);
        product.variations = variationsResponse.data;
      } catch (error) {
        console.error("Error fetching variations:", error);
        product.variations = [];
      }
    } else {
      product.variations = [];
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getFilteredProducts({
  categoryId,
  page = 1,
  perPage = 12,
  minPrice = null,
  maxPrice = null,
  attributes = {},
} = {}) {
  try {
    const params = {
      page,
      per_page: perPage,
      status: "publish",
    };

    if (categoryId) {
      params.category = categoryId;
    }

    if (minPrice !== null) {
      params.min_price = minPrice;
    }

    if (maxPrice !== null) {
      params.max_price = maxPrice;
    }

    // Add attribute filters
    Object.entries(attributes).forEach(([attribute, values]) => {
      params[`attribute_${attribute}`] = values.join(",");
    });

    const { data, headers } = await api.get("products", { params });

    return {
      products: data,
      totalPages: parseInt(headers["x-wp-totalpages"] || "1"),
      totalProducts: parseInt(headers["x-wp-total"] || "0"),
    };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return { products: [], totalPages: 0, totalProducts: 0 };
  }
}
