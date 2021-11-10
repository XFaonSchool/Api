import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/_app";
import { DefaultButton, Dialog, DialogFooter, PrimaryButton, ProgressIndicator, Spinner } from "@fluentui/react";
import { AppLayout } from "./_shared/AppLayout/AppLayout";

let onLoginStateUpdated = (newState: string) => { };
let onLoginError = (message: string) => { };

api.account.onLoginTokenSuccess(() => {
	onLoginStateUpdated("loggedIn");
});

api.account.onLoginTokenFailed((reason) => {
	if (reason == "invalid") {
		onLoginError("Failed to login because you have an invalid token. This may sometimes happen when you account password is updated, ");
    }
});

export function tryLogin() {
	if (api.ready) {
		api.account.loginToken(localStorage.getItem("token"));
	}
} 

api.onReady(() => {
	if (typeof window != "undefined") {
		tryLogin();
	}
});

api.guild.onGetAllCurrent((guilds) => {
	console.log(guilds);
});

export function MainPage() {
	const [loggedIn, setLoggedInState] = useState<"checking" | "loggedIn" | "loggedOut">("checking");
	const [hasLoginError, setHasLoginError] = useState(false);
	const [loginError, setLoginError] = useState<false | string>(false);
	const navigate = useNavigate();

	onLoginError = (error) => {
		setLoginError(error);
	}

	if (!localStorage.getItem("token")) {
		navigate("/login?redirect-reason=not-logged-in");
		return (<></>);
	}

	tryLogin();
	onLoginStateUpdated = (newState: any) => {
		setLoggedInState(newState);

		if (newState == "loggedIn") {
			api.guild.getAllCurrent();
        }
    }

	return (
		<div className="_page_main-page">
			<AppLayout>
				<Dialog hidden={!loginError} title="Failed to login">
					{loginError}

					<DialogFooter>
						<PrimaryButton onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Go to Login</PrimaryButton>
						<DefaultButton onClick={() => { setLoginError(false); tryLogin(); }}>Try Again</DefaultButton>
					</DialogFooter>
				</Dialog>

				<h1>Hello</h1>
			</AppLayout>
		</div>
	);
}