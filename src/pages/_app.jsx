// pages/_app.js
import Head from 'next/head';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-image: url('/assets/images/purple_back.jpg'); /* Correct path */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed; /* Keeps the background fixed */
    background-position: center;
  }
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Set title and favicon */}
      <Head>
        <title>Poll Fun</title> {/* Tab Name */}
        <link rel="icon" href="/assets/images/poll.png" /> {/* Favicon */}
      </Head>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}
