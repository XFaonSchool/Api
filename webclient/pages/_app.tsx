import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AxeriApi } from "../../apiNodeClient/App";
import Head from "next/head";

const api = new AxeriApi({
    port: 7090
});

api.run();

function _App({ Component, pageProps }: AppProps) {
    return (
        <div suppressHydrationWarning>
            <Head>
                <title>Axeri</title>

            </Head>

            {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </div>
    );
} 

export default _App;
