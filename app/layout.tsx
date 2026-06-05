import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://thai-chuai-thai-calculator.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "คำนวณไทยช่วยไทย พลัส 60/40 | ซื้อได้สูงสุดกี่บาท",
    template: "%s | คำนวณไทยช่วยไทย พลัส",
  },
  description:
    "กรอกเงินรัฐที่เหลือวันนี้ แล้วคำนวณทันทีว่าไทยช่วยไทย พลัส 60/40 ซื้อของได้สูงสุดกี่บาท คุณจ่ายเองเท่าไหร่ และรัฐช่วยจ่ายเท่าไหร่",
  keywords: [
    "คำนวณไทยช่วยไทย",
    "ไทยช่วยไทย พลัส",
    "ไทยช่วยไทย 60/40",
    "เงินรัฐเหลือ 200 ซื้อได้กี่บาท",
    "คำนวณสิทธิรัฐ",
    "เครื่องคิดเงินไทยช่วยไทย",
    "รัฐช่วยจ่าย 60",
  ],
  authors: [{ name: "Aphichat Kaewphilarom" }],
  creator: "Aphichat Kaewphilarom",
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: siteUrl,
    title: "คำนวณไทยช่วยไทย พลัส 60/40",
    description:
      "กรอกเงินรัฐที่เหลือวันนี้ แล้วดูทันทีว่าซื้อของได้สูงสุดกี่บาทให้ใช้สิทธิหมดพอดี",
    siteName: "คำนวณไทยช่วยไทย พลัส",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "คำนวณไทยช่วยไทย พลัส 60/40" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "คำนวณไทยช่วยไทย พลัส 60/40",
    description:
      "กรอกเงินรัฐที่เหลือวันนี้ แล้วดูทันทีว่าซื้อของได้สูงสุดกี่บาทให้ใช้สิทธิหมดพอดี",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
