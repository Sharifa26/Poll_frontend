// pages/_app.js
import Head from 'next/head';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%; /* Ensures the body and html cover the viewport height */
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #805882, #9e8bbf); /* Smooth purple gradient */
    background-size: cover; /* Ensures the image covers the entire screen */
    background-position: center; /* Centers the background image */
    background-repeat: no-repeat; /* Ensures the image doesn't repeat */
    background-attachment: fixed; /* Makes the background static */
  }
  
  html, body, #__next {
  height: 100%;
  margin: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


  @media (max-width: 768px) { /* Mobile View */
    html, body {
      background: linear-gradient(to bottom, #805882, #9e8bbf); /* Mobile-friendly gradient */
      background-size: cover; /* Ensures the image covers the entire screen */
      background-position: center; /* Centers the background image */
      background-repeat: no-repeat; /* Ensures the image doesn't repeat */
      background-attachment: fixed; /* Makes the background static */
    }
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
