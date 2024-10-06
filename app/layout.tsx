"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Bubbles from "./components/Bubble";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-mono">
      <body className={`${inter.className} font-mono`}>
        <StoreProvider>
          <Bubbles /> {/* 泡アニメーションを追加 */}
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
