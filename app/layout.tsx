import type { Metadata } from "next";
// 1. Ganti import font Geist dengan Inter dan Playfair_Display
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// 2. Konfigurasikan font yang baru
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

// 3. (Opsional tapi direkomendasikan) Perbarui metadata
export const metadata: Metadata = {
  title: "Rasya?",
  description: "Iskandar Portofolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 4. Terapkan variabel font yang baru di className body */}
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}