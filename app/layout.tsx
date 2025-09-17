import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "/public/assets/css/main.css";
import "/node_modules/react-modal-video/css/modal-video.css";
import "/public/assets/css/plugins/custom-datepicker.css";
import "./globals.css";

const urbanist = Urbanist({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grace Mobile Car Rental",
  description: "Rent a car with ease and convenience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable}`}>{children}</body>
    </html>
  );
}
