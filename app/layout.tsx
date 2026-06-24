import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "why hello there :)",
  description: "Personal portfolio and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`min-h-full bg-white text-neutral-900 ${dmSans.className}`}>
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
