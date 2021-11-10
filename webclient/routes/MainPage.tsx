import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/_app";
import { Spinner } from "@fluentui/react";

let onLoginStateUpdated = (newState: string) => { };

api.account.onLoginTokenSuccess(() => {
	onLoginStateUpdated("loggedIn");
});

function tryLogin() {
	if (api.ready) {
		api.account.loginToken(localStorage.getItem("token"));
	}
} 

api.onReady(() => {
	if (typeof window != "undefined") {
		tryLogin();
	}
});

export function MainPage() {
	const [loggedIn, setLoggedInState] = useState<"checking" | "loggedIn" | "loggedOut">("checking");
	const navigate = useNavigate();

	if (!loggedIn) {
		navigate("/login?redirect-reason=not-logged-in");
		return (<></>);
	}

	tryLogin();
	onLoginStateUpdated = (newState: any) => {
		setLoggedInState(newState);
    }

	return (
		<div className="_page_main-page">
			<h2>{
				loggedIn == "checking"
					? <Spinner labelPosition="right" label="Logging In" />
					: "You are logged in"
			}</h2>
			{!loggedIn ? <p>You are not logged in, redirecting in 3 seconds</p> : ""}
		</div>
	);
}