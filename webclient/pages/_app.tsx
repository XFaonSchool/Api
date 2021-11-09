import "../styles/globals.css";
import type { AppProps } from "next/app"

function _App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
	  <p>HRM UWU</p>
    </div>
  );
}

export default _App;
