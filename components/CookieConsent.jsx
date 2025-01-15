"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/cookieConsent.module.css";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true and can't be changed
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    setIsClient(true);
    const consentChoice = localStorage.getItem("cookieConsent");

    if (consentChoice) {
      try {
        const savedPreferences = JSON.parse(consentChoice);
        setCookiePreferences(savedPreferences);
        if (savedPreferences.analytics) {
          initializeAnalytics();
        }
      } catch (e) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  const initializeAnalytics = () => {
    if (typeof window === "undefined" || window.GA_INITIALIZED) return;

    window.GA_INITIALIZED = true;

    try {
      const gtmScript = document.createElement("script");
      gtmScript.defer = true;
      gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;

      const initScript = document.createElement("script");
      initScript.defer = true;
      initScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `;

      document.head.appendChild(gtmScript);
      document.head.appendChild(initScript);
    } catch (error) {
      console.error("Failed to initialize analytics:", error);
    }
  };

  const savePreferences = (preferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    if (preferences.analytics) {
      initializeAnalytics();
    }
    setIsVisible(false);
  };

  const handleAccept = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const handleDecline = () => {
    const allDeclined = {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(allDeclined);
  };

  const handleSavePreferences = () => {
    savePreferences(cookiePreferences);
    setShowPreferences(false);
  };

  // Don't render anything on server
  if (!isClient || !isVisible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        {!showPreferences ? (
          <>
            <h2 className={styles.title}>Consentement aux Cookies</h2>
            <div className={styles.description}>
              <p className={styles.message}>
                Nous utilisons des cookies pour améliorer votre expérience sur
                notre site. Vous pouvez personnaliser vos préférences ou
                accepter/refuser l'ensemble des cookies. Pour plus
                d'informations, consultez notre{" "}
                <Link href="/politique-de-confidentialite">
                  Politique de Confidentialité
                </Link>
                , <Link href="/conditions-generales-de-vente">CGV</Link> et{" "}
                <Link href="/mentions-legales">Mentions Légales</Link>.
              </p>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => setShowPreferences(true)}
                  className={styles.preferencesButton}
                >
                  Personnaliser
                </button>
                <button
                  onClick={handleDecline}
                  className={styles.declineButton}
                >
                  Refuser
                </button>
                <button onClick={handleAccept} className={styles.acceptButton}>
                  Tout Accepter
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.preferences}>
            <h2 className={styles.title}>Préférences des Cookies</h2>

            <div className={styles.cookieTypes}>
              <div className={styles.cookieType}>
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.necessary}
                    disabled
                  />
                  Cookies Nécessaires
                </label>
                <p>
                  Ces cookies sont indispensables au fonctionnement du site.
                </p>
              </div>

              <div className={styles.cookieType}>
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) =>
                      setCookiePreferences({
                        ...cookiePreferences,
                        analytics: e.target.checked,
                      })
                    }
                  />
                  Cookies Analytiques
                </label>
                <p>
                  Pour améliorer notre site en analysant le comportement des
                  visiteurs.
                </p>
              </div>

              <div className={styles.cookieType}>
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.functional}
                    onChange={(e) =>
                      setCookiePreferences({
                        ...cookiePreferences,
                        functional: e.target.checked,
                      })
                    }
                  />
                  Cookies Fonctionnels
                </label>
                <p>
                  Pour mémoriser vos préférences et personnaliser votre
                  expérience.
                </p>
              </div>

              <div className={styles.cookieType}>
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.marketing}
                    onChange={(e) =>
                      setCookiePreferences({
                        ...cookiePreferences,
                        marketing: e.target.checked,
                      })
                    }
                  />
                  Cookies Marketing
                </label>
                <p>Pour vous proposer des publicités pertinentes.</p>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                onClick={() => setShowPreferences(false)}
                className={styles.backButton}
              >
                Retour
              </button>
              <button
                onClick={handleSavePreferences}
                className={styles.saveButton}
              >
                Enregistrer les préférences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
