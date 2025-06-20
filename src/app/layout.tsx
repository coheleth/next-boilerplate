import { Inter, Montserrat } from "next/font/google";

import siteinfo from "../siteinfo";
import { Footer } from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

import "../styles/globals.scss";

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
