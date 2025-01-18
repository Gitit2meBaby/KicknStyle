"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/commande.module.scss";
import ShippingInfo from "../../components/ShippingInfo";
import { isEUCountry } from "../../lib/shippingUtils";
import Image from "next/image";

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

  // Calculate if customer is outside EU
  const isOutsideEU = formData.country && !isEUCountry(formData.country);

  return (
    <div className={styles.checkoutPage}>
      <h1>Commande</h1>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h2>Récapitulatif de la commande</h2>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.productImage}>
              {item.images?.[0]?.src && (
                <Image
                  src={item.images[0].src}
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
                  {Object.entries(item.variants)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")}
                </p>
              )}
              <p className={styles.quantity}>Quantité: {item.quantity}</p>
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
          <div className={styles.total}>
            <span>Total (HT):</span>
            <span>€{(subtotal + shippingCost).toFixed(2)}</span>
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
            <option value="FR">France</option>
            <option value="BE">Belgique</option>
            <option value="DE">Allemagne</option>
            <option value="AD">Andorre</option>
            <option value="AL">Albanie</option>
            <option value="AM">Arménie</option>
            <option value="AT">Autriche</option>
            <option value="AZ">Azerbaïdjan</option>
            <option value="BA">Bosnie-Herzégovine</option>
            <option value="BG">Bulgarie</option>
            <option value="BY">Biélorussie</option>
            <option value="CH">Suisse</option>
            <option value="CY">Chypre</option>
            <option value="CZ">République tchèque</option>
            <option value="DK">Danemark</option>
            <option value="EE">Estonie</option>
            <option value="ES">Espagne</option>
            <option value="FI">Finlande</option>
            <option value="GB">Royaume-Uni</option>
            <option value="GE">Géorgie</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Grèce</option>
            <option value="HR">Croatie</option>
            <option value="HU">Hongrie</option>
            <option value="IE">Irlande</option>
            <option value="IS">Islande</option>
            <option value="IT">Italie</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lituanie</option>
            <option value="LU">Luxembourg</option>
            <option value="LV">Lettonie</option>
            <option value="MC">Monaco</option>
            <option value="MD">Moldavie</option>
            <option value="ME">Monténégro</option>
            <option value="MK">Macédoine du Nord</option>
            <option value="MT">Malte</option>
            <option value="NL">Pays-Bas</option>
            <option value="NO">Norvège</option>
            <option value="PL">Pologne</option>
            <option value="PT">Portugal</option>
            <option value="RO">Roumanie</option>
            <option value="RS">Serbie</option>
            <option value="RU">Russie</option>
            <option value="SE">Suède</option>
            <option value="SI">Slovénie</option>
            <option value="SK">Slovaquie</option>
            <option value="SM">Saint-Marin</option>
            <option value="UA">Ukraine</option>
            <option value="VA">Vatican</option>
            <option value="XK">Kosovo</option>

            {/* Amériques */}
            <option value="US">États-Unis</option>
            <option value="CA">Canada</option>
            <option value="BR">Brésil</option>
            <option value="MX">Mexique</option>
            <option value="AR">Argentine</option>
            <option value="CL">Chili</option>
            <option value="CO">Colombie</option>
            <option value="PE">Pérou</option>

            {/* Asie */}
            <option value="JP">Japon</option>
            <option value="CN">Chine</option>
            <option value="KR">Corée du Sud</option>
            <option value="IN">Inde</option>
            <option value="ID">Indonésie</option>
            <option value="MY">Malaisie</option>
            <option value="SG">Singapour</option>
            <option value="TH">Thaïlande</option>
            <option value="VN">Vietnam</option>

            {/* Océanie */}
            <option value="AU">Australie</option>
            <option value="NZ">Nouvelle-Zélande</option>

            {/* Afrique */}
            <option value="MA">Maroc</option>
            <option value="DZ">Algérie</option>
            <option value="TN">Tunisie</option>
            <option value="EG">Égypte</option>
            <option value="ZA">Afrique du Sud</option>
            <option value="CI">Côte d&apos;Ivoire</option>
            <option value="SN">Sénégal</option>

            {/* Moyen-Orient */}
            <option value="AE">Émirats arabes unis</option>
            <option value="IL">Israël</option>
            <option value="SA">Arabie Saoudite</option>
            <option value="TR">Turquie</option>
            <option value="LB">Liban</option>
            <option value="QA">Qatar</option>
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

        <button type="submit" className={styles.submitButton}>
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
