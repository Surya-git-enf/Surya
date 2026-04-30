
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peddishetti Surya — Portfolio",
  description:
    "Peddishetti Surya builds full stack AI apps and immersive 3D websites that convert visitors into customers.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
