import { Theme, createTheme } from "@fluentui/react";

const darkTheme: Theme = createTheme({
	palette: {
		themePrimary: "#60cdff",
		themeLighterAlt: "#f9fdff",
		themeLighter: "#e6f7ff",
		themeLight: "#d0f0ff",
		themeTertiary: "#a0e1ff",
		themeSecondary: "#74d3ff",
		themeDarkAlt: "#57b8e6",
		themeDark: "#4a9cc2",
		themeDarker: "#36738f",
		neutralLighterAlt: "#282828",
		neutralLighter: "#313131",
		neutralLight: "#3f3f3f",
		neutralQuaternaryAlt: "#484848",
		neutralQuaternary: "#4f4f4f",
		neutralTertiaryAlt: "#6d6d6d",
		neutralTertiary: "#c8c8c8",
		neutralSecondary: "#d0d0d0",
		neutralPrimaryAlt: "#dadada",
		neutralPrimary: "#ffffff",
		neutralDark: "#f4f4f4",
		black: "#f8f8f8",
		white: "#1f1f1f"
	}
});

const lightTheme: Theme = createTheme({
	palette: {
		themePrimary: "#0078d4",
		themeLighterAlt: "#eff6fc",
		themeLighter: "#deecf9",
		themeLight: "#c7e0f4",
		themeTertiary: "#71afe5",
		themeSecondary: "#2b88d8",
		themeDarkAlt: "#106ebe",
		themeDark: "#005a9e",
		themeDarker: "#004578",
		neutralLighterAlt: "#faf9f8",
		neutralLighter: "#f3f2f1",
		neutralLight: "#edebe9",
		neutralQuaternaryAlt: "#e1dfdd",
		neutralQuaternary: "#d0d0d0",
		neutralTertiaryAlt: "#c8c6c4",
		neutralTertiary: "#a19f9d",
		neutralSecondary: "#605e5c",
		neutralPrimaryAlt: "#3b3a39",
		neutralPrimary: "#323130",
		neutralDark: "#201f1e",
		black: "#000000",
		white: "#ffffff"
	}
});

const currentTheme = darkTheme;
export { currentTheme };

function themeToCssVars(theme: Theme): string {
	const palette = theme.palette;
	let css = "";

	for (let key in palette) {
		css += "--" + key + ": " + (palette as any)[key] + ";";
	}

	return css;
}

export { themeToCssVars };