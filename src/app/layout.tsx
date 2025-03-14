import type { Metadata } from "next";
import "./globals.css";
import RootStyleRegistry from "./emotion";

export const metadata: Metadata = {
  title: "Fujisaki Ozora Portfolio",
  description: "Fujisaki Ozora Portfolio",
  icons: {
    icon: '/icon.svg', 
  },
  openGraph: {
    title: 'Fujisaki Ozora Portfolio',
    description: '2025 Fujisaki Ozora Portfolio',
    url: 'https://fujisaki-portfolio.vercel.app',
    siteName: 'Fujisaki Ozora Portfolio',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fujisaki Ozora Portfolio',
    description: '2025 Fujisaki Ozora Portfolio',
    images: ['https://fujisaki-portfolio.vercel.app/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
