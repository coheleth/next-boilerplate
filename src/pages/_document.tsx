import { Html, Head, Main, NextScript } from "next/document";
import siteinfo from "../siteinfo";
import { Footer } from "../components/Footer";

export default function Document() {
  return (
    <Html lang={siteinfo.lang}>
      <Head />
      <body>
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
