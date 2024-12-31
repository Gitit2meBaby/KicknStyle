// app/product/[id]/utils/metadata.js
export function generateProductMetadata(product) {
  if (!product) return {};

  const {
    name,
    description,
    short_description,
    price,
    regular_price,
    sale_price,
    images,
    stock_status,
  } = product;

  // Strip HTML tags from description
  const cleanDescription = short_description?.replace(/<[^>]*>/g, "") || "";

  // Generate keywords based on product data
  const keywords = [
    name,
    ...(product.categories?.map((cat) => cat.name) || []),
    ...(product.tags?.map((tag) => tag.name) || []),
  ].filter(Boolean);

  return {
    title: name,
    description: cleanDescription,
    keywords: keywords.join(", "),
    openGraph: {
      title: name,
      description: cleanDescription,
      images:
        images?.map((img) => ({
          url: img.src,
          width: 800,
          height: 600,
          alt: img.alt || name,
        })) || [],
      type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: cleanDescription,
      images: images?.[0]?.src,
    },
  };
}

export function generateProductSchema(product, baseUrl) {
  if (!product) return null;

  const {
    id,
    name,
    description,
    price,
    regular_price,
    sale_price,
    images,
    stock_status,
    average_rating,
    rating_count,
  } = product;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description?.replace(/<[^>]*>/g, "") || "",
    sku: product.sku || "",
    mpn: id.toString(),
    image: images?.map((img) => img.src) || [],
    offers: {
      "@type": "Offer",
      priceCurrency: [
        "USD",
        "EUR",
        "GBP",
        "CAD",
        "AUD",
        "NZD",
        "JPY",
        "CNY",
        "INR",
        "RUB",
        "BRL",
        "MXN",
        "SGD",
        "HKD",
        "TWD",
        "KRW",
        "TRY",
        "PLN",
        "THB",
        "IDR",
        "CZK",
        "DKK",
        "HUF",
        "CZK",
        "SEK",
        "NOK",
        "CHF",
        "ISK",
        "HRK",
        "RON",
        "BGN",
        "HRK",
        "RSD",
        "UAH",
        "BYN",
        "KZT",
        "AZN",
        "UZS",
        "KGS",
        "TJS",
        "GEL",
        "AMD",
        "MDL",
        "UYU",
        "PEN",
        "COP",
        "VEF",
        "PYG",
        "BOB",
        "PAB",
        "GYD",
        "SRD",
        "VED",
        "MRU",
        "STN",
        "CUP",
        "ANG",
        "AWG",
        "BIF",
      ],
      price: sale_price || regular_price,
      priceValidUntil:
        product.date_on_sale_to ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      availability:
        stock_status === "instock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${baseUrl}/product/${id}`,
      seller: {
        "@type": "Organization",
        name: "Your Store Name",
      },
    },
  };

  // Add review data if available
  if (rating_count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: average_rating,
      reviewCount: rating_count,
    };
  }

  return schema;
}
