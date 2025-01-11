import React from "react";
import Image from "next/image";

import styles from "../styles/hero.module.scss";

import hero from "../public/hero.webp";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Image
        src={hero}
        alt="kick and style backdrop"
        width={1920}
        height={1080}
        fill
        priority
      />
      <h1>Muay Thai Fashion</h1>
      <h2>For Boys</h2>
      <h2>For Girls</h2>
    </section>
  );
};

export default Hero;
