import { Nunito } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolioData";
import { SITE_URL } from "@/lib/constants";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.name} | ${profile.brand}`,
  description: profile.siteDescription,
  openGraph: {
    title: `${profile.name} | ${profile.brand}`,
    description: profile.siteDescription,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
