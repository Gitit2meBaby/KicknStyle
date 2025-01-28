// HomeSliderWrapper.jsx
import dynamic from "next/dynamic";
import { getCategoriesWithFeaturedImage } from "../lib/woocommerce";

const HomeSlider = dynamic(() => import("./HomeSlider"), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <span>Chargement du carrousel...</span>
    </div>
  ),
});

import styles from "../styles/homeSlider.module.scss";

const HomeSliderWrapper = async () => {
  const categories = await getCategoriesWithFeaturedImage();

  const validCategories = categories.filter(
    (cat) => cat.slug !== "uncategorized" && cat.count > 0
  );

  if (!validCategories?.length) {
    return (
      <div className={styles.noCategories}>
        <p>Aucune catégorie disponible pour le moment</p>
      </div>
    );
  }

  return (
    <section className={styles.sliderWrapper}>
      <h3>Découvrez nos produits par catégorie</h3>
      <HomeSlider categories={validCategories} />
    </section>
  );
};

export default HomeSliderWrapper;
