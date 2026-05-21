
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Surya Peddishetti | AI & Full-Stack Engineer",
  description:
    "Creative developer building cinematic web experiences, interactive 3D portfolios, and AI-powered full stack apps.",
  // Your live Vercel URL!
  metadataBase: new URL("https://surya-lemon.vercel.app"), 
  openGraph: {
    title: "Surya Peddishetti | AI & Full-Stack Engineer",
    description:
      "Creative developer building cinematic web experiences, interactive 3D portfolios, and AI-powered full stack apps.",
    url: "https://surya-lemon.vercel.app",
    siteName: "Surya Peddishetti Portfolio",
    images: [
      {
        url: "/opengraph-image.png", // Next.js will automatically find this in your app/ folder
        width: 1200,
        height: 630,
        alt: "Surya Peddishetti - Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
