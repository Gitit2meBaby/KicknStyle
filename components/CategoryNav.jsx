import React from "react";
import { getCategories } from "../lib/woocommerce";

import styles from "../styles/categoryNav.module.css";

export default async function CategoryNav() {
  const categories = await getCategories();

  return (
    <nav className={styles.categoryNav}>
      {categories.map((category) => (
        <a key={category.id} href={`/category/${category.slug}`}>
          {category.name}
        </a>
      ))}
    </nav>
  );
}
