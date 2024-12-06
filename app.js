import '../styles/globals.css';
import theme from '../styles/themes';

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ fontFamily: theme.fonts.main, background: theme.colors.background }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
