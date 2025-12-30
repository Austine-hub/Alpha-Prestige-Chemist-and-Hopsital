//src/app/layout.tsx

// layout.tsx (SERVER)

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata (server-only)
export const metadata: Metadata = {
  title: "AMMOHPHARM PHARMACEUTICALS",
  description: "AMMOPharm Drug Store - Your trusted pharmacy partner.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
