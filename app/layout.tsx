import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/lib/profile";

export const viewport: Viewport = {
  themeColor: "#a8c5a0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "LUMINA Face Art",
    template: "%s | LUMINA Face Art",
  },
  description: "Oslikavanje lica za rođendane i evente",
  metadataBase: new URL(profile.websiteUrl),
  openGraph: {
    title: "LUMINA Face Art",
    description: "Oslikavanje lica za rođendane i evente",
    url: profile.websiteUrl,
    siteName: profile.brand,
    locale: "hr_HR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "LUMINA Face Art logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMINA Face Art",
    description: "Oslikavanje lica za rođendane i evente",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="bg-cream text-forest antialiased">{children}</body>
    </html>
  );
}
