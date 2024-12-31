import getProduct from "./getProduct";

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    };
  }

  return {
    title: `${product.name} - Your Store Name`,
    description: product.short_description?.replace(/<[^>]*>/g, "") || "",
    openGraph: {
      title: product.name,
      description: product.short_description?.replace(/<[^>]*>/g, "") || "",
      images: product.images?.map((img) => ({
        url: img.src,
        width: 800,
        height: 600,
        alt: img.alt || product.name,
      })),
    },
  };
}

export default generateMetadata;
