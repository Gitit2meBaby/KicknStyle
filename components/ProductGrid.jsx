// components/ProductGrid.jsx
import ProductCard from "./ProductCard";
import styles from "../styles/productGrid.module.scss";

const ProductGrid = ({ products }) => {
  if (!products?.length) {
    return <div>Aucun produit trouvé</div>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
