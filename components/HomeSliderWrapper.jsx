// HomeSliderWrapper.jsx
import dynamic from "next/dynamic";
import { getCategoriesWithFeaturedImage } from "../lib/woocommerce";

// Dynamically import the HomeSlider component with SSR disabled
const HomeSlider = dynamic(() => import("./HomeSlider"), {
  ssr: false,
  loading: () => <div>Loading carousel...</div>,
});

import styles from "../styles/homeSlider.module.css";

const HomeSliderWrapper = async () => {
  const categories = await getCategoriesWithFeaturedImage();

  const filteredCategories = categories.filter(
    (cat) => cat.slug !== "uncategorized"
  );

  if (!filteredCategories?.length) {
    return <div>No categories found</div>;
  }

  return (
    <section className={styles.sliderWrapper}>
      <h3>Check out our products by category</h3>
      <HomeSlider categories={filteredCategories} />
    </section>
  );
};

export default HomeSliderWrapper;
