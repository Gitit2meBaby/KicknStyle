// lib/api/wordpress.js
import { WooCommerceRestApi } from "@woocommerce/woocommerce-rest-api";

export async function getProduct(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/wp/product/${id}`,
    {
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: [`product-${id}`],
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getFeaturedProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/wp/featured-products`,
    {
      next: {
        revalidate: 3600,
        tags: ["featured-products"],
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }

  return response.json();
}
