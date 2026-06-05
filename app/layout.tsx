import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://thai-chuai-calc.vercel.app";

const title = "เงินรัฐเหลือเท่านี้ ต้องซื้อของกี่บาท? | คำนวณไทยช่วยไทย พลัส 60/40";
const description =
  "กรอกเงินรัฐที่เหลือวันนี้ แล้วคำนวณทันทีว่าควรซื้อของไม่เกินกี่บาท เพื่อใช้สิทธิไทยช่วยไทย พลัส 60/40 ให้หมดพอดี พร้อมคำนวณเราจ่าย 40% และรัฐช่วย 60%";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | คำนวณไทยช่วยไทย พลัส 60/40",
  },
  description,
  keywords: [
    "คำนวณไทยช่วยไทย",
    "คำนวณไทยช่วยไทย พลัส",
    "ไทยช่วยไทย 60/40",
    "เงินรัฐเหลือ 200 ซื้อได้กี่บาท",
    "เงินรัฐเหลือ 150 ซื้อได้กี่บาท",
    "เงินรัฐเหลือ 100 ซื้อได้กี่บาท",
    "รัฐช่วยจ่าย 60%",
    "เราจ่าย 40%",
    "แอปเป๋าตัง",
    "G-Wallet",
    "ร้านค้าถุงเงิน",
    "ยอดซื้อคุ้มสุดต่อวัน",
    "ใช้สิทธิให้หมดพอดี",
  ],
  authors: [{ name: "Aphichat Kaewphilarom" }],
  creator: "Aphichat Kaewphilarom",
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: siteUrl,
    title: "เงินรัฐเหลือเท่านี้ ต้องซื้อของกี่บาท?",
    description:
      "คำนวณยอดซื้อจากเงินรัฐที่เหลือ เพื่อใช้สิทธิไทยช่วยไทย พลัส 60/40 ให้หมดพอดี",
    siteName: "คำนวณไทยช่วยไทย พลัส 60/40",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "เงินรัฐเหลือเท่านี้ ต้องซื้อของกี่บาท",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "เงินรัฐเหลือเท่านี้ ต้องซื้อของกี่บาท?",
    description:
      "คำนวณยอดซื้อจากเงินรัฐที่เหลือ เพื่อใช้สิทธิไทยช่วยไทย พลัส 60/40 ให้หมดพอดี",
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
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
