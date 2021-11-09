import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AxeriApi } from "../../apiNodeClient/App";

const api = new AxeriApi({
    port: 7090
});

api.run();

function _App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
	  <p>HRM UWU</p>
    </div>
  );
}

export default _App;
