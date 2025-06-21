//******************************************************************************
//    Base layout for the website, with default metadata settings.
//******************************************************************************

import siteinfo from "../siteinfo";

import { Footer } from "../components/Footer";

import { Metadata } from "next/types";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

import "../styles/globals.scss";


export const metadata: Metadata = {
  title: {
    default: siteinfo.title,
    template: `%s | ${siteinfo.title}`
  },
  description: siteinfo.description,
  icons: "/favicon.ico",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang={siteinfo.lang}>
      <head />
      <body>
        { children }
        <Footer />
      </body>
    </html>
  );
}
