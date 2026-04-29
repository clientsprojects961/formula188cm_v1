import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { FloatingVideo } from "@/components/floating-video"
import { StickyBuyBar } from "@/components/sticky-buy-bar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" })

export const metadata: Metadata = {
  title: "Formula188CM — India's #1 Height Growth Supplement | Grow 2–4 Inches Naturally",
  description:
    "Trusted by 4,874 Indians. Formula188CM helps adults aged 18–28 grow 2–4 inches naturally, with zero side effects. Doctor recommended. Results guaranteed or full refund.",
  icons: {
    icon: "/favicon.jpeg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1226685509281757');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1226685509281757&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
        <FloatingVideo />
        <StickyBuyBar />
      </body>
    </html>
  )
}
