import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Election Copilot | Your Guide to Democracy",
  description: "Interactive election simulator, personalized timeline, and AI-powered voting guide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} premium-gradient min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
