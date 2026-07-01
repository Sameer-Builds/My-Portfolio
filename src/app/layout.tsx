import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sameer Akhtar | MERN Stack Developer",
  description:
    "Portfolio of Sameer Akhtar — Computer Science graduate with hands-on MERN stack experience, building responsive web applications.",
  keywords: [
    "web developer",
    "portfolio",
    "MERN stack developer",
    "React",
    "Next.js",
    "Sameer Akhtar",
  ],
  authors: [{ name: "Sameer Akhtar" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sameer Akhtar | MERN Stack Developer",
    description:
      "Computer Science graduate with hands-on MERN stack experience, building responsive web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased portfolio-body`}
      >
        {children}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}