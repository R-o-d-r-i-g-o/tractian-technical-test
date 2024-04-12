import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
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
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {children}
      </AppRouterCacheProvider>
    </body>
  </html>
);


export default RootLayout;
