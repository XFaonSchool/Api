import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AxeriApi } from "../../apiNodeClient/App";
import Head from "next/head";
import { ThemeProvider, createTheme, initializeIcons } from "@fluentui/react";

initializeIcons();

const api = new AxeriApi({
	port: 7090
});

let onApiReady = () => { };

api.onReady(() => {
	onApiReady();
});

function startApiConnection() {
	api.run();
}

export { api };
startApiConnection();

const lightTheme = createTheme({
	palette: {
		themePrimary: '#00a656',
		themeLighterAlt: '#f1fbf7',
		themeLighter: '#caf1de',
		themeLight: '#a0e4c3',
		themeTertiary: '#51c98f',
		themeSecondary: '#15b065',
		themeDarkAlt: '#00954d',
		themeDark: '#007e41',
		themeDarker: '#005d30',
		neutralLighterAlt: '#faf9f8',
		neutralLighter: '#f3f2f1',
		neutralLight: '#edebe9',
		neutralQuaternaryAlt: '#e1dfdd',
		neutralQuaternary: '#d0d0d0',
		neutralTertiaryAlt: '#c8c6c4',
		neutralTertiary: '#a19f9d',
		neutralSecondary: '#605e5c',
		neutralPrimaryAlt: '#3b3a39',
		neutralPrimary: '#323130',
		neutralDark: '#201f1e',
		black: '#000000',
		white: '#ffffff',
	}
});

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

const currentTheme = darkTheme;

function insertStylesToDom() {
	let prefix = ":root{";

	for (let key in currentTheme.palette) {
		prefix += "--" + key + ":" + currentTheme.palette[key] + ";";
	}

	let styles = document.createElement("style");
	styles.innerHTML = prefix + "}";

	document.head.appendChild(styles);
}

function paletteToScss() {
	let config = "";

	for (let key in currentTheme.palette) {
		config += "$" + key + ": var(--" + key + ");\n";
	}
}

function _App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider applyTo="body" theme={currentTheme}>
			<div suppressHydrationWarning>
				<Head>
					<title>Axeri</title>
				</Head>

				{typeof window == 'undefined' ? null : insertStylesToDom()}
				{typeof window === 'undefined' ? null : <Component {...pageProps} />}
			</div>
		</ThemeProvider>
	);
} 

export default _App;
