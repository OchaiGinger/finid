import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PageLoader } from "@/components/layout/PageLoader";

export const metadata: Metadata = {
  title: "Agnexi | Premium Financial Identity",
  description: "AI-Powered Financial Identity Visualization and Trust Scoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head></head>
      <body className="font-body selection:bg-primary/30 bg-[#050101]">
        <PageLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
