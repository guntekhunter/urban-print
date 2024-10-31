import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./component/template/Navbar";
import SideBar from "./component/template/SideBar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urban Print",
  description: "Aplikasi Printing Management Urban Print",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        {/* <NextUIProvider> */}
        <Navbar />
        <div className="flex">
          <SideBar />
          <div className="w-full">{children}</div>
        </div>
        {/* </NextUIProvider> */}
      </body>
    </html>
  );
}
