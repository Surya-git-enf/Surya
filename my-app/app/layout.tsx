
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Peddishetti Surya | Creative Developer",
  description: "I build full stack AI apps and design immersive 3D websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${ubuntu.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
