import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
// @ts-expect-error Typescript might fail due to manual nextjs init
import "./globals.css";
import { siteMetadata } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"], 
  style: ["normal", "italic"],
  variable: '--font-cormorant'
});

const jost = Jost({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"],
  variable: '--font-jost'
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Sitharom Pool Villa",
              "description": "Exclusive private pool villas with 24/7 butler service.",
              "url": "https://sitharom.com",
              "telephone": "+1234567890",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Tropical Way",
                "addressLocality": "Bali",
                "addressRegion": "Bali",
                "postalCode": "80361",
                "addressCountry": "ID"
              },
              "starRating": {
                "@type": "Rating",
                "ratingValue": "5"
              }
            })
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${jost.variable} font-body relative text-villa-dark`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
