import { DefaultButton, isIOS, MessageBar, MessageBarType, PrimaryButton, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import styles from "./Login.module.scss";
import FormPage from "../_shared/FormPage.module.scss";
import { useLocation } from "react-router-dom";

export function Login() {
	const query = new URLSearchParams(useLocation().search);

	function getRedirectReason(reason: string, action: (reason: string) => any): string | null {
		let answer = null as string;

		if (reason == "not-logged-in") {
			answer = "You must be logged in to use Axeri";

			return action(answer);;
		}

		return answer;
    }

	return (
		<div className={FormPage.root}>
			<div className={FormPage.content}>
				{getRedirectReason(query.get("redirect-reason"), (reason) => <MessageBar messageBarType={MessageBarType.info}>{reason}</MessageBar>)}

				<div className={FormPage.form}>
					<h1>Login</h1>
					<br />

					<TextField label="UserName or Email" underlined />
					<br />
					<TextField canRevealPassword label="Password" type="password" underlined />

					<br />
					<Stack horizontalAlign="end">
						<PrimaryButton>Login</PrimaryButton>
					</Stack>
				</div>
			</div>
		</div>
	);
}