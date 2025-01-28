"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import ShippingInfo from "../../components/ShippingInfo";
import { isEUCountry } from "../../lib/shippingUtils";
import hoodieShipping from "../../hoodieShippingData";
import tshirtShipping from "../../shirtShippingData";

import styles from "../../styles/commande.module.scss";

const CART_UPDATE_EVENT = "cartUpdate";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "FR",
    phone: "",
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [customsDutyConsent, setCustomsDutyConsent] = useState(false);

  useEffect(() => {
    // Load cart items from localStorage
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    setSubtotal(total);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartItems(items);
      const total = items.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );
      setSubtotal(total);
    };

    // Initial load
    updateCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCart();
    };

    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    };
  }, []);

  const calculateDeliveryTime = (country, items) => {
    if (!country || !items?.length) return null;

    // Get delivery times from shipping data
    const getDeliveryRange = (deliveryString) => {
      const matches = deliveryString.match(/(\d+)-(\d+)/);
      return matches
        ? { min: parseInt(matches[1]), max: parseInt(matches[2]) }
        : { min: 1, max: 3 };
    };

    // Get shipping data based on item type
    const shirtItems = items.filter(
      (item) =>
        !item.description
          ?.toLowerCase()
          .includes("tshirt" || "t shirt" || "T-shirt")
    );
    const hoodieItems = items.filter((item) =>
      item.description?.toLowerCase().includes("hoodie" || "sweat à capuche")
    );

    let maxRange = { min: 0, max: 0 };

    // Check hoodie delivery times
    if (hoodieItems.length > 0) {
      const hoodieDelivery = getDeliveryRange(
        hoodieShipping[country]?.delivery || ""
      );
      maxRange = hoodieDelivery;
    }

    // Check shirt delivery times and use the longer range
    if (shirtItems.length > 0) {
      const shirtDelivery = getDeliveryRange(
        tshirtShipping[country]?.delivery || ""
      );
      maxRange.min = Math.max(maxRange.min, shirtDelivery.min);
      maxRange.max = Math.max(maxRange.max, shirtDelivery.max);
    }

    // Calculate dates
    const today = new Date();
    const minDeliveryDate = new Date(today);
    const maxDeliveryDate = new Date(today);

    // Add business days
    minDeliveryDate.setDate(today.getDate() + maxRange.min);
    maxDeliveryDate.setDate(today.getDate() + maxRange.max);

    // Format dates in French
    const formatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return {
      minDate: minDeliveryDate.toLocaleDateString("fr-FR", formatOptions),
      maxDate: maxDeliveryDate.toLocaleDateString("fr-FR", formatOptions),
    };
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    setSubtotal(
      updatedItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      )
    );

    // Update cart count
    const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", newCount.toString());

    // Dispatch custom event for cart counter
    window.dispatchEvent(
      new CustomEvent(CART_UPDATE_EVENT, {
        detail: { totalItems: newCount },
      })
    );
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    setSubtotal(
      updatedItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      )
    );

    // Update cart count
    const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", newCount.toString());

    // Dispatch custom event for cart counter
    window.dispatchEvent(
      new CustomEvent(CART_UPDATE_EVENT, {
        detail: { totalItems: newCount },
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gdprConsent) {
      alert("Veuillez accepter la politique de confidentialité");
      return;
    }

    // TODO: Implement order submission
    console.log("Form submitted:", formData);
    console.log("Cart items:", cartItems);
  };

  const calculateShippingSavings = (items) => {
    if (!items.length) return null;

    // Group items by type
    const shirtItems = items.filter(
      (item) => !item.description?.toLowerCase().includes("hoodie")
    );
    const hoodieItems = items.filter((item) =>
      item.description?.toLowerCase().includes("hoodie")
    );

    // Calculate what shipping would cost if each item was shipped separately
    const individualShipping = [...shirtItems, ...hoodieItems].reduce(
      (total, item) => {
        const isHoodie = item.description?.toLowerCase().includes("hoodie");
        const shippingRate = isHoodie ? hoodieShipping : tshirtShipping;
        return total + shippingRate[formData.country].basePrice * item.quantity;
      },
      0
    );

    // If the difference is positive, return the savings
    if (individualShipping > shippingCost) {
      return {
        savings: individualShipping - shippingCost,
        originalPrice: individualShipping,
      };
    }

    return null;
  };

  // Calculate if customer is outside EU
  const isOutsideEU = formData.country && !isEUCountry(formData.country);

  const isButtonDisabled = () => {
    if (!gdprConsent) return true;
    if (isOutsideEU && !customsDutyConsent) return true;
    return false;
  };
  return (
    <div className={styles.checkoutPage}>
      <h1>Commande</h1>

      <div className={styles.orderSummary}>
        <h2>Récapitulatif de la commande</h2>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.productImage}>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                />
              )}
            </div>
            <div className={styles.productInfo}>
              <h3>{item.name}</h3>
              {item.variants && (
                <p className={styles.variants}>
                  {Object.entries(item.variants).map(
                    ([key, value], index, arr) => (
                      <React.Fragment key={key}>
                        {key.toLowerCase() === "couleur" ||
                        key.toLowerCase() === "taille" ? (
                          <strong>{key}</strong>
                        ) : (
                          key
                        )}
                        : {value}
                        {index < arr.length - 1 ? ", " : ""}
                      </React.Fragment>
                    )
                  )}
                </p>
              )}
              <div className={styles.quantityControls}>
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityBtn}
                  disabled={item.quantity <= 1}
                  type="button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityBtn}
                  type="button"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.removeBtn}
                  type="button"
                >
                  Supprimer
                </button>
              </div>
            </div>
            <div className={styles.price}>
              €{(item.price * item.quantity).toFixed(2)} HT
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className={styles.totals}>
          <div className={styles.subtotal}>
            <span>Sous-total (HT):</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <ShippingInfo
            country={formData.country}
            items={cartItems}
            onShippingCalculated={(cost) => setShippingCost(cost)}
          />
          {/* Shipping savings display */}
          {(() => {
            const savings = calculateShippingSavings(cartItems);
            if (savings) {
              return (
                <div className={styles.shippingSavings}>
                  <p>
                    Vous économisez{" "}
                    <strong>€{savings.savings.toFixed(2)}</strong> sur les frais
                    de port en groupant vos articles !
                  </p>
                  <p className={styles.originalPrice}>
                    Prix d&apos;expédition séparée :{" "}
                    <span className={styles.strikethrough}>
                      €{savings.originalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              );
            }
            return null;
          })()}
          <div className={styles.total}>
            <span>Total (HT):</span>
            <span>€{(subtotal + shippingCost).toFixed(2)}</span>
          </div>

          <div className={styles.deliveryTime}>
            {(() => {
              const deliveryDates = calculateDeliveryTime(
                formData.country,
                cartItems
              );
              if (deliveryDates) {
                return (
                  <p>
                    Livraison estimée entre le{" "}
                    <strong>{deliveryDates.minDate}</strong> et le{" "}
                    <strong>{deliveryDates.maxDate}</strong>
                  </p>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <h2>Informations de livraison</h2>

        <div className={styles.formGroup}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Prénom *"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Nom *"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email *"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Téléphone *"
            required
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Adresse *"
            required
          />

          <div className={styles.formRow}>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Ville *"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="Code postal *"
              required
            />
          </div>

          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className={styles.countrySelect}
          >
            <option value="">Sélectionnez un pays</option>
            <option value="ZA">Afrique du Sud</option>
            <option value="AL">Albanie</option>
            <option value="DZ">Algérie</option>
            <option value="DE">Allemagne</option>
            <option value="AD">Andorre</option>
            <option value="SA">Arabie Saoudite</option>
            <option value="AR">Argentine</option>
            <option value="AM">Arménie</option>
            <option value="AU">Australie</option>
            <option value="AT">Autriche</option>
            <option value="AZ">Azerbaïdjan</option>
            <option value="BE">Belgique</option>
            <option value="BY">Biélorussie</option>
            <option value="BA">Bosnie-Herzégovine</option>
            <option value="BR">Brésil</option>
            <option value="BG">Bulgarie</option>
            <option value="CA">Canada</option>
            <option value="CL">Chili</option>
            <option value="CN">Chine</option>
            <option value="CY">Chypre</option>
            <option value="KR">Corée du Sud</option>
            <option value="CI">Côte d&apos;Ivoire</option>
            <option value="HR">Croatie</option>
            <option value="DK">Danemark</option>
            <option value="EG">Égypte</option>
            <option value="AE">Émirats arabes unis</option>
            <option value="ES">Espagne</option>
            <option value="EE">Estonie</option>
            <option value="US">États-Unis</option>
            <option value="FI">Finlande</option>
            <option value="FR">France</option>
            <option value="GE">Géorgie</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Grèce</option>
            <option value="HU">Hongrie</option>
            <option value="IN">Inde</option>
            <option value="ID">Indonésie</option>
            <option value="IE">Irlande</option>
            <option value="IS">Islande</option>
            <option value="IL">Israël</option>
            <option value="IT">Italie</option>
            <option value="JP">Japon</option>
            <option value="XK">Kosovo</option>
            <option value="LV">Lettonie</option>
            <option value="LB">Liban</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lituanie</option>
            <option value="LU">Luxembourg</option>
            <option value="MK">Macédoine du Nord</option>
            <option value="MY">Malaisie</option>
            <option value="MT">Malte</option>
            <option value="MA">Maroc</option>
            <option value="MX">Mexique</option>
            <option value="MD">Moldavie</option>
            <option value="MC">Monaco</option>
            <option value="ME">Monténégro</option>
            <option value="NO">Norvège</option>
            <option value="NZ">Nouvelle-Zélande</option>
            <option value="NL">Pays-Bas</option>
            <option value="PE">Pérou</option>
            <option value="PL">Pologne</option>
            <option value="PT">Portugal</option>
            <option value="QA">Qatar</option>
            <option value="CZ">République tchèque</option>
            <option value="RO">Roumanie</option>
            <option value="GB">Royaume-Uni</option>
            <option value="RU">Russie</option>
            <option value="SM">Saint-Marin</option>
            <option value="SN">Sénégal</option>
            <option value="RS">Serbie</option>
            <option value="SG">Singapour</option>
            <option value="SK">Slovaquie</option>
            <option value="SI">Slovénie</option>
            <option value="SE">Suède</option>
            <option value="CH">Suisse</option>
            <option value="TH">Thaïlande</option>
            <option value="TN">Tunisie</option>
            <option value="TR">Turquie</option>
            <option value="UA">Ukraine</option>
            <option value="VA">Vatican</option>
            <option value="VN">Vietnam</option>
          </select>
        </div>

        {/* Consent Checkboxes */}
        <div className={styles.consentSection}>
          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              required
            />
            J&apos;accepte la politique de confidentialité et le traitement de
            mes données personnelles
          </label>

          {isOutsideEU && (
            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                checked={customsDutyConsent}
                onChange={(e) => setCustomsDutyConsent(e.target.checked)}
                required
              />
              Je comprends que des frais de douane peuvent s&apos;appliquer pour
              les livraisons hors UE
            </label>
          )}
        </div>

        {/* Order Notes */}
        <div className={styles.orderNotes}>
          <h3>Informations importantes</h3>
          <ul>
            <li>Les prix sont indiqués hors TVA (HT)</li>
            <li>
              Un email de confirmation vous sera envoyé avec les détails de
              votre commande
            </li>
            <li>
              Vous pouvez modifier ou annuler votre commande avant le paiement
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          style={
            isButtonDisabled()
              ? {
                  pointerEvents: "none",
                  filter: "blur(1px)",
                  cursor: "not-allowed",
                }
              : {}
          }
          disabled={isButtonDisabled()}
        >
          Procéder au paiement
        </button>
      </form>
    </div>
  );
};

// EU Countries list for customs duty warning
const EUCountries = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
];

export default CheckoutPage;
