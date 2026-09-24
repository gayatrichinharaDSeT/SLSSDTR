import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title = "SLSSDTR | School of Life Science – Skill Development, Training & Research";
const description =
  "SLSSDTR bridges academia and industry through industry-aligned skill development, training, research and AI transformation programs for the life sciences ecosystem.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title,
    description,
    siteName: "SLSSDTR",
    type: "website",
    images: ["/logo/slssdtr-logo.png"],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/logo/slssdtr-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-body text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
