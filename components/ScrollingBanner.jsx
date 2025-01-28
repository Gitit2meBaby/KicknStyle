// components/ScrollingBanner.jsx
"use client";
import React from "react";
import styles from "../styles/scrollingBanner.module.scss";

const ScrollingBanner = () => {
  const text = "Ton Muay Thai, Ton Style";

  // Create multiple copies of the text for seamless scrolling
  const repeatedText = `${text} • `.repeat(10);

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <div className={styles.content}>{repeatedText}</div>
        <div className={styles.content} aria-hidden="true">
          {repeatedText}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
