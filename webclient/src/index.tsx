import React from "react"
import ReactDOM from "react-dom"
import "./index.sass"
import App from "./App"
import { ThemeProvider } from "@fluentui/react";

ReactDOM.render(
	<ThemeProvider applyTo="body">
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ThemeProvider>,
	document.getElementById("root")
)
