export const metadata = {
  title: "Pria Menggendong Puma",
  description: "Ilustrasi SVG seorang pria menggendong puma",
};

import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

