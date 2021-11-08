import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import { ThemeProvider } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { currentTheme, themeToCssVars } from "./components/Theme";
import { AxeriApi } from "../../ApiNodeClient/App";

initializeIcons();

const api = new AxeriApi({
	port: 7090
});

api.run();

const cssTheme = themeToCssVars(currentTheme);
const style = document.createElement("style");

style.innerHTML = ":root {" + cssTheme + "}"
document.head.appendChild(style);

ReactDOM.render(
	<ThemeProvider applyTo="body" theme={currentTheme}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ThemeProvider>,
	document.getElementById('root')
)
