// Slide.jsx
"use client";
import React from "react";
import Image from "next/image";

import styles from "../styles/slide.module.css";

const Slide = ({ category }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.imageWrapper}>
        {category.featuredImage ? (
          <>
            <Image
              src={category.featuredImage}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.image}
              priority={false}
            />
            <button className={styles.btn}>{category.name}</button>
          </>
        ) : (
          <div className={styles.placeholder}>{category.name[0]}</div>
        )}
      </div>
      <p className={styles.count}>{category.count} produits</p>
    </div>
  );
};

export default Slide;
