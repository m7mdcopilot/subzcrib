import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "subzcrib.com - Subscription Management System",
  description: "Modern subscription management system built with Next.js, MongoDB, and TypeScript. Manage recurring revenue, customers, and analytics with ease.",
  keywords: ["subzcrib", "subscription management", "Next.js", "TypeScript", "MongoDB", "recurring revenue", "SaaS"],
  authors: [{ name: "subzcrib.com Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "subzcrib.com - Subscription Management",
    description: "Modern subscription management system for recurring revenue businesses",
    url: "https://subzcrib.com",
    siteName: "subzcrib.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "subzcrib.com - Subscription Management",
    description: "Modern subscription management system for recurring revenue businesses",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
