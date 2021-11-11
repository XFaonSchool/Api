import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/_app";
import { DefaultButton, Dialog, DialogFooter, PrimaryButton, ProgressIndicator, Spinner } from "@fluentui/react";
import { AppLayout } from "./_shared/AppLayout/AppLayout";

let onLoginStateUpdated = (newState: string) => { };
let onLoginError = (message: string, error: string) => { };

let loggedIn = false;

api.account.onLoginTokenSuccess(() => {
	loggedIn = true;
	onLoginStateUpdated("loggedIn");
});

api.account.onLoginTokenFailed((reason) => {
	loggedIn = false;

	if (reason == "invalid") {
		onLoginError("Failed to login because you have an invalid token. This may sometimes happen when you account password is updated", reason);
		return;
	}

	onLoginError("Failed to login via token", reason);
});

export function tryLogin() {
	if (api.ready && typeof window != undefined && !loggedIn) {
		api.account.loginToken(localStorage.getItem("token"));
	}
} 

api.onReady(() => {
	console.info("API is ready");
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
	const [loginErrorReason, setErrorReason] = useState("");
	const navigate = useNavigate();

	onLoginError = (error, reason) => {
		console.error("Err: " + reason);

		setLoginError(error);
		setErrorReason(reason);
	}

	if (!localStorage.getItem("token")) {
		navigate("/login?redirect-reason=not-logged-in");
		return (<></>);
	}

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
					<strong>Reason: {}</strong>

					<DialogFooter>
						<PrimaryButton onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Go to Login</PrimaryButton>
						<DefaultButton onClick={() => { setLoginError(false); tryLogin(); }}>Try Again</DefaultButton>
					</DialogFooter>
				</Dialog>

				<h1>Hello</h1>
				<PrimaryButton onClick={() => tryLogin()}>Try Login</PrimaryButton>
			</AppLayout>
		</div>
	);
}