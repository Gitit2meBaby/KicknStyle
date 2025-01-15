import React from "react";
import styles from "../../styles/legal.module.scss";

export const metadata = {
  title: "Mentions Légales | Kick and Style",
  description:
    "Informations légales de Kick and Style - Découvrez nos informations juridiques, coordonnées et mentions légales.",
  alternates: {
    canonical: "/mentions-legales",
  },
  openGraph: {
    title: "Mentions Légales | Kick and Style",
    description:
      "Informations légales de Kick and Style - Découvrez nos informations juridiques, coordonnées et mentions légales.",
    url: "/mentions-legales",
    siteName: "Kick and Style",
    locale: "fr_FR",
    type: "website",
  },
};

export default function LegalLayout({ children }) {
  return <main className={styles.main}>{children}</main>;
}
