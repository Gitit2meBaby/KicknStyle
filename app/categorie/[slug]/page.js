// app/category/[slug]/page.js
import { getProductsByCategory } from "../../../lib/woocommerce";
import ProductGrid from "../../../components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params, searchParams }) {
  // Extract filter parameters
  const priceFilter = searchParams?.prix?.split("-").map(Number);
  const attributeFilters = Object.entries(searchParams || {})
    .filter(([key]) => key !== "prix")
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

  console.log("Filtered products:", filteredProducts);

  return (
    <>
      <ProductGrid products={filteredProducts} />
    </>
  );
}
