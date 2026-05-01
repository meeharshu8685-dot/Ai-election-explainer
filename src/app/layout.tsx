import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Election Copilot | Civic Guidance for Every Indian Voter",
  description:
    "Election Copilot helps every Indian voter understand elections — voter registration, EVMs, polling booths, Parliament, and more. Built for the Google Antigravity Challenge.",
  keywords: "election, India, voting, voter registration, EVM, lok sabha, democracy, civic",
  openGraph: {
    title: "Election Copilot | Civic Guidance for Every Indian Voter",
    description: "Interactive civic guidance platform for first-time and informed voters.",
    type: "website",
  },
};

// Replace GA_MEASUREMENT_ID with your real Google Analytics ID (e.g. G-XXXXXXXXXX)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-PLACEHOLDER";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {/* Skip to main content for keyboard/screen reader accessibility */}
        <a
          href="#main-content"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
          onFocus={(e) => {
            (e.target as HTMLAnchorElement).style.left = "0";
            (e.target as HTMLAnchorElement).style.width = "auto";
            (e.target as HTMLAnchorElement).style.height = "auto";
          }}
          onBlur={(e) => {
            (e.target as HTMLAnchorElement).style.left = "-9999px";
          }}
        >
          Skip to main content
        </a>
        <main id="main-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
