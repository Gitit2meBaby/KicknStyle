"use client";
import { useState, useEffect } from "react";
import { calculateShipping } from "../lib/shippingUtils";
import styles from "../styles/shippingInfo.module.scss";

const ShippingInfo = ({ country, items, onShippingCalculated }) => {
  const [shippingDetails, setShippingDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country && items?.length) {
      try {
        const details = calculateShipping(country, items);
        setShippingDetails(details);
        onShippingCalculated(details.cost);
        setError(null);
      } catch (err) {
        console.error("Shipping calculation error:", err);
        setError("Unable to calculate shipping");
        onShippingCalculated(0);
      }
    }
  }, [country, items, onShippingCalculated]);

  if (error) return <div className={styles.error}>{error}</div>;
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
