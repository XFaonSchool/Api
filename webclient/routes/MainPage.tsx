import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "./_shared/AppLayout/AppLayout";
import { LoginManager } from "./_shared/LoginManager/LoginManager";

export function MainPage() {
	const [loggedIn, setLoggedInState] = useState<"checking" | "loggedIn" | "loggedOut">("checking");
	const [hasLoginError, setHasLoginError] = useState(false);
	const [loginError, setLoginError] = useState<false | string>(false);
	const [loginErrorReason, setErrorReason] = useState("");
	const navigate = useNavigate();
	const [guilds, setGuilds] = useState<any>([]);

	return (
		<div className="_page_main-page">
			<AppLayout>
				<LoginManager />
				<h1>Home</h1>
			</AppLayout>
		</div>
	);
}