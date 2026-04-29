
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surya Peddishetti — Portfolio",
  description:
    "Full Stack AI Developer & 3D Web Architect. I build immersive experiences that convert visitors into customers.",
  openGraph: {
    title: "Surya Peddishetti",
    description: "Full Stack AI Developer & 3D Web Architect",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black antialiased">{children}</body>
    </html>
  );
}
