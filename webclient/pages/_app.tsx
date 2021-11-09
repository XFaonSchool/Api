import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AxeriApi } from "../../apiNodeClient/App";
import Head from "next/head";
import { ThemeProvider } from "@fluentui/react";

const api = new AxeriApi({
    port: 7090
});

api.run();

function _App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <div suppressHydrationWarning>
                <Head>
                    <title>Axeri</title>

                </Head>

                {typeof window === 'undefined' ? null : <Component {...pageProps} />}
            </div>
        </ThemeProvider>
    );
} 

export default _App;
