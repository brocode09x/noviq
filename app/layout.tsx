import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Noviq",
  description:
    "Noviq — Pay-per-request AI services powered by on-chain USDC payments on Arc. No subscriptions, no gas, just sign and run.",
  icons: {
    icon: [
      { url: "/assets/Noviq.png", type: "image/png" },
    ],
    shortcut: "/assets/Noviq.png",
    apple: "/assets/Noviq.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem("noviq_theme") === "light") {
                  document.documentElement.removeAttribute("data-theme");
                } else {
                  document.documentElement.setAttribute("data-theme", "dark");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
