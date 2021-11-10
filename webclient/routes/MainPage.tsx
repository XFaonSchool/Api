import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/_app";
import { ProgressIndicator, Spinner } from "@fluentui/react";
import { AppLayout } from "./_shared/AppLayout/AppLayout";

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

	if (!localStorage.getItem("token")) {
		navigate("/login?redirect-reason=not-logged-in");
		return (<></>);
	}

	tryLogin();
	onLoginStateUpdated = (newState: any) => {
		setLoggedInState(newState);
    }

	return (
		<div className="_page_main-page">
			<AppLayout>
				<h1>Hello</h1>
			</AppLayout>
		</div>
	);
}