import type { Metadata } from 'next';

const defaultMetadata = {
  title: "Sitharom Pool Villa | Luxury Private Pool Villa Stay",
  description: "Sitharom Pool Villa offers exclusive private pool villas with 24/7 butler service, in-villa dining, and lush tropical gardens. Book your dream retreat today.",
  keywords: "pool villa, private villa, luxury villa stay, tropical retreat, sitharom, villa booking, pool villa holiday",
}

export const siteMetadata: Metadata = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  keywords: defaultMetadata.keywords,
  openGraph: {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    type: 'website',
    images: ['/images/og-image.jpg'], // Using a placeholder path
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMetadata.title,
    description: defaultMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://sitharom.com', // Example canonical URL
  },
}
