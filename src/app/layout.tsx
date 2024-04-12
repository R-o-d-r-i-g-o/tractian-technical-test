import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = Readonly<{
  children: React.ReactNode;
}>

export const metadata: Metadata = {
  title: "Tractian Technical Test",
  description: "Use tractian in ur company floor",
};

const RootLayout = ({ children }: Props) => (
  <html lang="br">
    <body className={inter.className}>
      {children}
    </body>
  </html>
);


export default RootLayout;
