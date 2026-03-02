import { Inknut_Antiqua } from "next/font/google";
import "./globals.css";

const inknutAntiqua = Inknut_Antiqua({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-inknut-antiqua",
});

export const metadata = {
  // Used by Next.js to build absolute URLs for Open Graph images, etc.
  // You can set NEXT_PUBLIC_SITE_URL in `.env.local` for production.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "ÈMÍ-ÌGI – Artisanal handcrafted pieces",
    template: "%s | ÈMÍ-ÌGI",
  },
  description:
    "Artisanal handcrafted pieces — more than illumination, more than objects.",
  icons: {
    icon: [
      { url: "/images/emi-logo.ico" },
      { url: "/images/emi-logo.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "ÈMÍ-ÌGI – Artisanal handcrafted pieces",
    description:
      "Artisanal handcrafted pieces — more than illumination, more than objects.",
    url: "/",
    siteName: "ÈMÍ-ÌGI",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/images/emi-hero.png",
        width: 1200,
        height: 630,
        alt: "ÈMÍ-ÌGI artisanal handcrafted pieces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ÈMÍ-ÌGI – Artisanal handcrafted pieces",
    description:
      "Artisanal handcrafted pieces — more than illumination, more than objects.",
    images: ["/images/emi-hero.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inknutAntiqua.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
