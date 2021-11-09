import * as React from "react";
import { useState } from "react";
import { Spinner } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

export function MainPage() {
	const [loggedIn, setLoggedInState] = useState<boolean | 0>(localStorage.getItem("token") ? true : false);
	const navigate = useNavigate();

	if (!loggedIn) {
		navigate("/login?redirect-reason=not-logged-in");
		return (<></>);
	}

	return (
		<div className="_page_main-page">
			<h2>{loggedIn ? "You are logged in" : "You are not logged in"}</h2>
			{!loggedIn ? <p>You are not logged in, redirecting in 3 seconds</p> : ""}
		</div>
	);
}