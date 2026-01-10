import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rijeka Online - News Portal",
  description: "Professional news publication for Rijeka and beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="hr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
