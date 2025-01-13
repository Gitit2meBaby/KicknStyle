import React from "react";

import styles from "../styles/info.module.css";

const Info = () => {
  return (
    <section className={styles.info}>
      <h2>Your Muay Thai, Your Style</h2>
      <h2 className={styles.title}>
        Kick<span>&</span>Style
      </h2>
      <p>
        Welcome to Our Online Store for Muay Thai-Inspired T-Shirts! Discover
        our exclusive collection of Muay Thai t-shirts designed for both girls
        and boys who want to blend style with performance. Each t-shirt reflects
        the powerful spirit, rich culture, and vibrant energy of Thai boxing,
        making them perfect for enthusiasts and fans alike. Our unique designs
        combine modern aesthetics with traditional elements, allowing you to
        express your passion for Muay Thai in a stylish way. Whether you're
        training in the ring or cheering from the sidelines, our t-shirts offer
        both comfort and flair. Showcase Your Love for Muay Thai with Class and
        Originality! Express Your Strength, Live Your Style!
      </p>
      <p style={{ marginTop: "1rem" }}>
        Shop now to find the perfect t-shirt that embodies your dedication to
        this incredible sport.
      </p>

      <button className="btn">See Products</button>
    </section>
  );
};

export default Info;
