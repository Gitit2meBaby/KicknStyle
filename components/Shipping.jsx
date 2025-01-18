"use client";

import { useState } from "react";
import styles from "../styles/shipping.module.scss";

import { shippingData } from "@/hoodieShippingData";

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState("FR");

  const countryInfo = shippingData[selectedCountry];

  return (
    <div className={styles.shippingContainer}>
      <h2>Information de Livraison</h2>

      <div className={styles.searchContainer}>
        <label htmlFor="country">Sélectionnez votre pays:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={styles.countrySelect}
        >
          {Object.entries(shippingData)
            .sort((a, b) => a[1].name.localeCompare(b[1].name))
            .map(([code, data]) => (
              <option key={code} value={code}>
                {data.name}
              </option>
            ))}
        </select>
      </div>

      {countryInfo && (
        <div className={styles.shippingInfo}>
          <div className={styles.infoRow}>
            <span>Pays:</span>
            <span>{countryInfo.name}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Délai de livraison estimé:</span>
            <span>{countryInfo.delivery}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Frais de port premier article:</span>
            <span>€{countryInfo.basePrice.toFixed(2)}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Frais par article supplémentaire:</span>
            <span>€{countryInfo.additionalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shipping;
