import { Inknut_Antiqua } from "next/font/google";
import "./globals.css";

const inknutAntiqua = Inknut_Antiqua({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-inknut-antiqua",
});

export const metadata = {
  title: "ÈMÍ-ÌGI",
  description:
    "Artisanal handcrafted pieces — more than illumination, more than objects.",
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
