import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003"
  ),
  title: {
    template: "%s | Your Store Name",
    default: "Your Store Name - Premium Products",
  },
  description: "Your Store Name - Discover our premium collection of products",
  keywords: ["ecommerce", "online store", "premium products"],
  authors: [{ name: "Your Store Name" }],
  creator: "Your Store Name",
  publisher: "Your Store Name",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Your Store Name",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourstorehandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// Generate organization schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Your Store Name",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
  sameAs: [
    "https://www.facebook.com/yourstore",
    "https://www.instagram.com/yourstore",
    // Add other social media URLs
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-123-456-7890",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

// Generate website schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Your Store Name",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
