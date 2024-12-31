// app/product/[slug]/page.js
import { getProductBySlug, getAllProductSlugs } from "@/lib/woocommerce";
import { notFound } from "next/navigation";
import styles from "@styles/product.module.scss";

// Generate static params for common products
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  console.log(product);

  return (
    <div className={styles.productContainer}>
      <h1>{product.name}</h1>
      {/* Rest of your product display code */}
    </div>
  );
}
