import React from "react";
import Image from "next/image";
import { Notable, The_Nautigal } from "next/font/google";

import styles from "../styles/hero.module.scss";

import hero from "../public/hero.webp";

const nautigal = The_Nautigal({
  subsets: ["latin"],
  weight: ["700"],
});

const noteable = Notable({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Image
        src={hero}
        alt="kick and style backdrop"
        // width={1920}
        // height={1080}
        fill
        priority
      />
      <h1 className={nautigal.className}>Muay Thai Street Wear</h1>
      <div className={styles.subs}>
        <h2 className={noteable.className}>
          pour les<br></br> garçons
        </h2>
        <h2 className={noteable.className}>
          pour les<br></br> filles
        </h2>
      </div>
    </section>
  );
};

export default Hero;
