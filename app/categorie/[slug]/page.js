// app/category/[slug]/page.js
import { getProductsByCategory, getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/ProductGrid";

export default async function CategoryPage({ params, searchParams }) {
  // Extract filter parameters
  const priceFilter = searchParams?.price?.split("-").map(Number);
  const attributeFilters = Object.entries(searchParams || {})
    .filter(([key]) => key !== "price")
    .reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value : [value];
      return acc;
    }, {});

  // Get initial products for the category
  const { products, totalProducts } = await getProductsByCategory(params.slug);

  // Apply price filter if present
  let filteredProducts = products;
  if (priceFilter) {
    const [min, max] = priceFilter;
    filteredProducts = filteredProducts.filter((product) => {
      const price = parseFloat(product.price);
      return price >= min && (max === null || price <= max);
    });
  }

  // Apply attribute filters if present
  Object.entries(attributeFilters).forEach(([attribute, values]) => {
    filteredProducts = filteredProducts.filter((product) => {
      const productAttr = product.attributes.find(
        (attr) => attr.name.toLowerCase() === attribute.toLowerCase()
      );
      return (
        productAttr &&
        values.some((value) =>
          productAttr.options
            .map((opt) => opt.toLowerCase())
            .includes(value.toLowerCase())
        )
      );
    });
  });

  return (
    <main>
      <h1>
        {params.slug.replace("-", " ").toUpperCase()}
        <span>
          ({filteredProducts.length} of {totalProducts} products)
        </span>
      </h1>
      <ProductGrid products={filteredProducts} />
    </main>
  );
}
