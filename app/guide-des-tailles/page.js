"use client";
import React, { useState } from "react";
import Image from "next/image";
import { The_Nautigal } from "next/font/google";
import { hoodieInchesData, hoodieCentimetersData } from "../../lib/hoodieSizes";
import { shirtInchesData, shirtCentimetersData } from "../../lib/shirtSizes";

import styles from "../../styles/guide.module.scss";

const nautigal = The_Nautigal({
  subsets: ["latin"],
  weight: ["700"],
});

export default function SizeGuidePage() {
  const [unit, setUnit] = useState("cm");
  const [activeTab, setActiveTab] = useState("shirt");

  const currentInchesData =
    activeTab === "shirt" ? shirtInchesData : hoodieInchesData;
  const currentCentimetersData =
    activeTab === "shirt" ? shirtCentimetersData : hoodieCentimetersData;
  const currentData =
    unit === "cm" ? currentCentimetersData : currentInchesData;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={`${styles.title} ${nautigal.className}`}>
          Guide des Tailles
        </h1>
        <p className={styles.subtitle}>
          Guide complet pour trouver votre taille idéale. Nos vêtements sont
          confectionnés sur commande rien que pour vous ! Nous nous efforçons de
          garantir la qualité et la précision de chaque pièce. Alors
          n&apos;hésitez pas à nous contacter si vous avez besoin d&apos;aide
          supplémentaire pour décider de votre ajustement parfait !
        </p>
      </div>

      {/* Product Type Selector */}
      <div className={styles.tabContainer}>
        <button
          onClick={() => setActiveTab("shirt")}
          className={`${styles.tabButton} ${
            activeTab === "shirt" ? styles.active : ""
          }`}
        >
          T-Shirts
        </button>
        <button
          onClick={() => setActiveTab("hoodie")}
          className={`${styles.tabButton} ${
            activeTab === "hoodie" ? styles.active : ""
          }`}
        >
          Sweats à Capuche
        </button>
      </div>

      {/* Unit Toggle */}
      <div className={styles.unitToggle}>
        <button
          onClick={() => setUnit("cm")}
          className={`${styles.unitButton} ${
            unit === "cm" ? styles.active : ""
          }`}
        >
          CM
        </button>
        <button
          onClick={() => setUnit("in")}
          className={`${styles.unitButton} ${
            unit === "in" ? styles.active : ""
          }`}
        >
          IN
        </button>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Size Chart */}
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Tableau des Mesures</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.sizeTable}>
              <thead>
                <tr>
                  <th>Taille</th>
                  <th>Longueur</th>
                  <th>Largeur</th>
                  {currentData[0]?.sleeve && <th>Longueur de manche</th>}
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => (
                  <tr
                    key={row.size}
                    className={index % 2 === 0 ? styles.evenRow : ""}
                  >
                    <td className={styles.sizeCell}>{row.size}</td>
                    <td>{row.length}</td>
                    <td>{row.width}</td>
                    {row.sleeve && <td>{row.sleeve}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement Guide */}
        <div className={styles.guideContainer}>
          <h2 className={styles.sectionTitle}>Guide de Mesure</h2>
          <div className={styles.imageWrapper}>
            <Image
              src={
                activeTab === "shirt" ? "/shirtSize.webp" : "/hoodieSize.webp"
              }
              alt={`Guide de mesure ${
                activeTab === "shirt" ? "T-Shirt" : "Sweat à Capuche"
              }`}
              fill
              className={styles.guideImage}
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>Informations Importantes</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>🌍 Différences de Taille par Région</h3>
            <p>
              Les clients américains sont conseillés de commander une taille
              au-dessus, car nos tailles européennes sont généralement plus
              ajustées que les tailles américaines.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>📏 Conseil de Mesure</h3>
            <p>
              Pour trouver votre taille idéale, nous vous recommandons de
              mesurer un vêtement similaire que vous possédez déjà et qui vous
              va bien, puis de comparer ces mesures avec notre guide.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>⚖️ Variations Possibles</h3>
            <p>
              Veuillez noter que les mesures peuvent varier légèrement
              (jusqu&apos;à 2&quot; / 5 cm) en raison du processus de
              fabrication artisanal.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>🎨 Processus de Fabrication</h3>
            <p>
              Nos vêtements sont confectionnés à la demande, nous garantissons
              des standards de qualité élevés et une excellente finition. Si
              votre ajustement n&apos;est pas parfait, nous voulons nous en
              assurer ! Mais faites de votre mieux car les frais
              d&apos;expédition ne sont pas couverts par notre politique de
              retour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
