import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "./SmoothCursor";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./seo";

const GTM_ID = "GTM-KCGBDZL2";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Aharon Berk",
    "Jewish wedding singer",
    "Jewish wedding music",
    "chuppah music",
    "Azamra",
    "simcha music",
    "Jewish recording artist",
    "live Jewish music",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#artist`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image.jpg`,
      logo: `${SITE_URL}/brand/ab-monogram.svg`,
      description: SITE_DESCRIPTION,
      genre: ["Jewish music", "Chassidic music", "Wedding music"],
      email: "aharon@azamra.co.za",
      sameAs: [
        "https://www.instagram.com/aharonberk/",
        "https://www.facebook.com/AharonBerk",
        "https://www.youtube.com/@aharonberkmusic/videos",
        "https://open.spotify.com/artist/2on0c6iQBHGTIn30q7te5Q",
        "https://music.apple.com/us/artist/aharon-berk/1521973943",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#artist` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <SmoothCursor />
      </body>
    </html>
  );
}
