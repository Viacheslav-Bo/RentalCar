import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Header from "@/src/components/Header/Header";
import ReactQueryProvider from "@/src/components/ReactQueryProvider/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Created by Viacheslav Bobivnyk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <ReactQueryProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
