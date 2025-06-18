//******************************************************************************
//    HTML document's head element (duh).
//******************************************************************************


import Head from "next/head";

interface Props {
  title: string;
  description: string;
}

export function PageHead({ title, description }: Readonly<Props>) {
  return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {process.env.GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.GOOGLE_SITE_VERIFICATION}
          />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
  );
}
