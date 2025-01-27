import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/header.module.css";

import logo from "../public/logo.png";

import CartBtn from "./CartBtn";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Image
          src={logo}
          alt="kick and style logo"
          width={150}
          height={50}
          priority
        />

        <nav>
          <Link href="/">Accueil</Link>
          <Link href="/categorie/tous">Catalogue</Link>
          <Link href="/guide-des-tailles">Guide des Tailles</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <CartBtn />
      </div>
    </header>
  );
};

export default Header;
