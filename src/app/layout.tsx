import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shivam Kumar Roy | Portfolio",
  description:
    "Personal portfolio of Shivam Kumar Roy — developer, creator, and tech enthusiast. Explore my projects, skills, and get in touch.",
  keywords: ["Shivam Kumar Roy", "portfolio", "developer", "frontend", "web developer"],
  authors: [{ name: "Shivam Kumar Roy" }],
  openGraph: {
    title: "Shivam Kumar Roy | Portfolio",
    description: "Personal portfolio of Shivam Kumar Roy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
        <SplashCursor />
        {children}
      </body>
    </html>
  );
}
