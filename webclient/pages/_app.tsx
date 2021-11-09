import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AxeriApi } from "../../apiNodeClient/App";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@fluentui/react";

const api = new AxeriApi({
    port: 7090
});

api.run();

const darkTheme = createTheme({
    palette: {
        themePrimary: '#50ffab',
        themeLighterAlt: '#f8fffc',
        themeLighter: '#e3fff1',
        themeLight: '#caffe5',
        themeTertiary: '#95ffcc',
        themeSecondary: '#64ffb4',
        themeDarkAlt: '#47e699',
        themeDark: '#3cc281',
        themeDarker: '#2c8f5f',
        neutralLighterAlt: '#212121',
        neutralLighter: '#2a2a2a',
        neutralLight: '#393939',
        neutralQuaternaryAlt: '#424242',
        neutralQuaternary: '#494949',
        neutralTertiaryAlt: '#686868',
        neutralTertiary: '#c8c8c8',
        neutralSecondary: '#d0d0d0',
        neutralPrimaryAlt: '#dadada',
        neutralPrimary: '#ffffff',
        neutralDark: '#f4f4f4',
        black: '#f8f8f8',
        white: '#171717',
    }
});

function _App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider applyTo="body" theme={darkTheme}>
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
