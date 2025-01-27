"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "../styles/sizeChartModal.module.scss";

import { hoodieInchesData, hoodieCentimetersData } from "../lib/hoodieSizes";
import { shirtInchesData, shirtCentimetersData } from "../lib/shirtSizes";

import shirtSize from "@/public/shirtSize.webp";
import hoodieSize from "@/public/hoodieSize.webp";

const SizeChartModal = ({ isOpen, onClose, isShirt }) => {
  const [unit, setUnit] = useState("cm");
  const [centimetersData, setCentimetersData] = useState();
  const [inchesData, setInchesData] = useState();

  useEffect(() => {
    if (isShirt) {
      setInchesData(shirtInchesData);
      setCentimetersData(shirtCentimetersData);
    } else {
      setInchesData(hoodieInchesData);
      setCentimetersData(hoodieCentimetersData);
    }
  }, [isShirt]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Guide des tailles</h2>

        <h3>Mesures du produit</h3>
        <p>
          Les clients américains doivent commander une taille au-dessus car les
          tailles européennes de ce fournisseur correspondent à une taille plus
          petite sur le marché américain.
        </p>
        <br></br>
        <p>
          Conseil de pro ! Mesurez l'un de vos produits à la maison et
          comparez-le avec les mesures que vous voyez dans ce guide.
        </p>

        <div className={styles.imgBox}>
          {isShirt ? (
            <Image src={shirtSize} alt="shirt size" height={344} width={344} />
          ) : (
            <Image
              src={hoodieSize}
              alt="hoodie size"
              height={344}
              width={344}
            />
          )}
        </div>

        <h2 className={styles.graphTitle}>Graphique</h2>
        <div className={styles.unitToggle}>
          <button
            className={`${styles.unitButton} ${
              unit === "cm" ? styles.active : ""
            }`}
            onClick={() => setUnit("cm")}
          >
            CM
          </button>
          <button
            className={`${styles.unitButton} ${
              unit === "in" ? styles.active : ""
            }`}
            onClick={() => setUnit("in")}
          >
            IN
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.sizeTable}>
            <thead>
              <tr>
                <th>Taille</th>
                <th>Longueur</th>
                <th>Largeur</th>
                {centimetersData?.[0]?.sleeve && <th>Longueur de manche</th>}
              </tr>
            </thead>
            <tbody>
              {(unit === "in" ? inchesData : centimetersData).map((row) => (
                <tr key={row.size}>
                  <td>{row.size}</td>
                  <td>{row.length}</td>
                  <td>{row.width}</td>
                  {centimetersData?.[0]?.sleeve && <td>{row.sleeve}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.disclaimer}>
          *Les mesures du produit peuvent varier jusqu'à 5 cm (2").
        </p>
      </div>
    </div>
  );
};

export default SizeChartModal;
