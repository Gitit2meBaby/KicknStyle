// components/ProductCard.jsx
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/productCard.module.scss";

const ProductCard = ({ product }) => {
  const { name, price_html, images, slug } = product;
  const imageUrl = images?.[0]?.src || "/placeholder-product.jpg";

  return (
    <Link href={`/produits/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <div
          className={styles.price}
          dangerouslySetInnerHTML={{ __html: price_html }}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
