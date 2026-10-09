import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/lib/providers/AppProviders";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "GMP in Pharmaceutical Manufacturing | Ronagen",
  description:
    "Interactive GMP presentation: conventional oral medicines and biotechnology-derived products — Ronagen / روناژن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
