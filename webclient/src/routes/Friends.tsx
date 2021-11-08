import { DefaultButton, PartialTheme, ThemeProvider } from "@fluentui/react";
import React from "react";

const lightTheme: PartialTheme = {
	semanticColors: {
	  bodyBackground: 'white',
	  bodyText: 'black',
	},
  };
  
  const darkTheme: PartialTheme = {
	semanticColors: {
	  bodyBackground: 'black',
	  bodyText: 'white',
	},
  };
  
function Friends() {
	const [isLight, setIsLight] = React.useState(true);

	return (
		<p>Heu</p>
	);
}

export default Friends;