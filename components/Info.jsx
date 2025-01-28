import React from "react";
import Link from "next/link";
import { The_Nautigal } from "next/font/google";

const nautigal = The_Nautigal({
  subsets: ["latin"],
  weight: ["700"],
});

import styles from "../styles/info.module.css";

const Info = () => {
  return (
    <section className={styles.info}>
      <h2 className={`${nautigal.className} ${styles.title}`}>
        Kick<span> &</span>Style
      </h2>
      <p>
        Bienvenue sur notre boutique en ligne de T-shirts inspirés du Muay
        Thai ! Découvrez notre collection exclusive de t-shirts Muay Thai conçus
        pour les filles et les garçons qui souhaitent allier style et
        performance. Chaque t-shirt reflète l'esprit puissant, la culture riche
        et l'énergie vibrante de la boxe thaïlandaise, ce qui les rend parfaits
        pour les passionnés et les fans. Nos designs uniques combinent une
        esthétique moderne avec des éléments traditionnels, vous permettant
        d'exprimer votre passion pour le Muay Thai avec style. Que vous vous
        entraîniez sur le ring ou que vous applaudissiez depuis le banc de
        touche, nos t-shirts offrent à la fois confort et style. Montrez votre
        amour pour le Muay Thai avec classe et originalité ! Exprimez votre
        force, vivez votre style !
      </p>
      <p style={{ marginTop: "1rem" }}>
        Achetez maintenant pour trouver le t-shirt parfait qui incarne votre
        dévouement à ce sport incroyable.
      </p>

      <Link href="/categorie/tous" className={styles.btn}>
        Voir les produits
      </Link>
    </section>
  );
};

export default Info;
