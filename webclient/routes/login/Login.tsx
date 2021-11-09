import { DefaultButton, isIOS, MessageBar, MessageBarType, PrimaryButton, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import styles from "./Login.module.scss";
import FormPage from "../_shared/FormPage.module.scss";
import { useLocation } from "react-router-dom";

export function Login() {
	const query = new URLSearchParams(useLocation().search);

	function getRedirectReason(reason: string): string | null {
		if (reason == "not-logged-in") {
			return "You must be logged in to use Axeri";
		}

		return null;
    }

	return (
		<div className={FormPage.root}>
			<div className={FormPage.content}>
				<MessageBar messageBarType={MessageBarType.error}>{getRedirectReason(query.get("redirect-reason"))}</MessageBar>

				<div className={FormPage.form}>
					<h1>Login</h1>
					<br />

					<TextField label="UserName or Email" underlined />
					<br />
					<TextField label="Password" type="password" underlined />

					<br />
					<Stack horizontalAlign="end">
						<PrimaryButton>Login</PrimaryButton>
					</Stack>
				</div>
			</div>
		</div>
	);
}