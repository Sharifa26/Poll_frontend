// pages/_app.js
import { Global, css } from '@emotion/react';

const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-image: url('/assets/images/background.jpg'); /* Correct path */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed; /* Keeps the background fixed */
    background-position: center;
  }
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}
