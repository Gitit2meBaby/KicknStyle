// app/category/[slug]/page.js
import { getProductsByCategory } from "@/lib/woocommerce";
import ProductGrid from "@/components/ProductGrid";

export default async function CategoryPage({ params }) {
  const { products, totalProducts } = await getProductsByCategory(params.slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {params.slug.replace("-", " ").toUpperCase()}
        <span className="text-gray-500 text-xl ml-2">
          ({totalProducts} products)
        </span>
      </h1>
      <ProductGrid products={products} />
    </main>
  );
}
