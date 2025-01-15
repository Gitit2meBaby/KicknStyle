import React from "react";

export const metadata = {
  title: "Politique de Confidentialité | Kick and Style",
  description:
    "Politique de confidentialité et utilisation des cookies de Kick and Style - Découvrez comment nous protégeons vos données personnelles.",
  alternates: {
    canonical: "/politique-de-confidentialite",
  },
  openGraph: {
    title: "Politique de Confidentialité | Kick and Style",
    description:
      "Politique de confidentialité et utilisation des cookies de Kick and Style - Découvrez comment nous protégeons vos données personnelles.",
    url: "/politique-de-confidentialite",
    siteName: "Kick and Style",
    locale: "fr_FR",
    type: "website",
  },
};

export default function PrivacyLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
