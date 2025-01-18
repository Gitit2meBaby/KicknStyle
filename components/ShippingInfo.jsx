"use client";

import { useState, useEffect } from "react";
import { calculateShipping } from "../lib/shippingUtils";
import styles from "../styles/shippingInfo.module.scss";

const ShippingInfo = ({ country, items, onShippingCalculated }) => {
  const [shippingDetails, setShippingDetails] = useState(null);

  useEffect(() => {
    if (country && items?.length) {
      const details = calculateShipping(country, items);
      setShippingDetails(details);
      onShippingCalculated(details.cost);
    }
  }, [country, items, onShippingCalculated]);

  if (!shippingDetails) return null;

  return (
    <div className={styles.shippingInfo}>
      <div className={styles.deliveryTime}>
        <strong>Délai de livraison estimé:</strong>{" "}
        {shippingDetails.deliveryTime}
      </div>
      <div className={styles.shippingCost}>
        <strong>Frais de livraison:</strong> €{shippingDetails.cost.toFixed(2)}
      </div>
      {!shippingDetails.isEU && (
        <div className={styles.customsWarning}>
          <p>Information importante pour les livraisons hors UE:</p>
          <p>
            Des frais de douane peuvent s'appliquer selon votre pays de
            résidence. Ces frais sont à la charge du client et ne sont pas
            inclus dans le prix d'achat.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
