import "../styles/globals.scss";
import siteinfo from "../siteinfo";
import { Footer } from "../components/Footer";

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
