import { Libre_Baskerville, Sen, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import TopReadingProgress from "@/components/readingProgress";

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre",
  display: "swap",
});

const sen = Sen({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sen",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://aicompassion.world'),
  title: "AI+Compassion Global Forum 2026 — Kyoto & Global Relay",
  description: "The Global Forum on AI + Compassion unites innovators, policymakers, and cultural leaders to explore how artificial intelligence can serve humanity and the planet.",
  openGraph: {
    title: "AI+Compassion Global Forum 2026",
    description: "The Global Forum on AI + Compassion unites innovators, policymakers, and cultural leaders to explore how artificial intelligence can serve humanity and the planet.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aicompassion.world",
    siteName: 'AI + Compassion',
    images: [
      {
        url: `/web-app-manifest-192x192.png`,
        width: 256,
        height: 75,
        alt: "AI + Compassion Global Forum 2026",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="AI + Compassion" />
      </head>
      <body
        className={`${libre.variable} ${sen.variable} ${jakarta.variable} font-sans antialiased text-[#171918] bg-[#F8F6F0] selection:bg-[#163B32] selection:text-[#F8F6F0]`}
      >
        <div className="cinema-grain" aria-hidden="true" />
        <TopReadingProgress />
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative flex flex-col w-full min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}