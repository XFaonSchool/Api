import { DefaultButton, Dialog, DialogFooter, isIOS, Label, MessageBar, MessageBarType, Modal, PrimaryButton, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import FormPage from "../_shared/FormPage.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { api } from "../../pages/_app";

let onLoginError = (reason: "bad-auth" | "invalid-account") => { };
let onLoginSuccess = (token) => { };

api.account.onLoginGetTokenFailed((reason) => onLoginError(reason));
api.account.onLoginGetTokenSuccess((token) => onLoginSuccess(token));

export function Login() {
	const navigate = useNavigate();
	const query = new URLSearchParams(useLocation().search);

	function getRedirectReason(reason: string, action: (reason: string) => any): string | null {
		let answer = null as string;

		if (reason == "not-logged-in") {
			answer = "You must be logged in to use Axeri";

			return action(answer);;
		}

		return answer;
	}

	const loginErrorsDefault = {
		userNameEmail: null,
		password: null
	};

	const [loginErrors, setLoginErrors] = useState({
		userNameEmail: null as string | null,
		password: null as string | null
	});

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const data = new FormData((e.target as HTMLFormElement));

		onLoginSuccess = (token) => {
			setLoginErrors(loginErrorsDefault);
			localStorage.setItem("token", token);

			navigate("/");
		}

		onLoginError = (reason) => {
			const newState = { ...loginErrorsDefault }

			if (reason == "invalid-account") {
				(() => {
					if ((data.get("user-name-email") as string).length == 0) {
						newState.userNameEmail = "Please enter a user name";
						return;
					}

					newState.userNameEmail = "That account doesn't seem to exist";
				})();
			}

			if (reason == "bad-auth") {
				(() => {
					if ((data.get("password") as string).length == 0) {
						newState.password = "Please enter a password";
						return;
                    }

					newState.password = "Invalid password, please try again";
				})();
			}

			setLoginErrors(newState);
		}

		api.account.loginGetToken({
			EmailUserName: data.get("user-name-email") as string,
			Password: data.get("password") as string
		});
    }

	return (
		<div className={FormPage.root}>
			<Dialog hidden={localStorage.getItem("token") ? false : true} title="You're already logged in!">
				You're already logged in. You can return to home

				<DialogFooter>
					<PrimaryButton onClick={() => navigate("/")}>Return To Home</PrimaryButton>
				</DialogFooter>
			</Dialog>

			<div className={FormPage.content}>
				{getRedirectReason(query.get("redirect-reason"), (reason) => <MessageBar messageBarType={MessageBarType.info}>{reason}</MessageBar>)}

				<form onSubmit={handleSubmit} className={FormPage.form}>
					<h1>Login</h1>
					<br />

					<Label>UserName or Email</Label>
					<TextField placeholder="Your UserName or Email" errorMessage={loginErrors.userNameEmail} name="user-name-email" underlined />

					<br />

					<Label>Password</Label>
					<TextField placeholder="Your Password" errorMessage={loginErrors.password} name="password" canRevealPassword type="password" underlined />

					<br />
					<Stack horizontal horizontalAlign="space-between">
						<Stack>
							<span className={FormPage.link}>
								<span>Don't have an account? </span> 
								<Link to="/register">Create Account</Link>
							</span>

							<span className={FormPage.link}>
								<span>Forgot your password? </span>
								<Link to="/login/reset">Reset Password</Link>
							</span>
						</Stack>

						<PrimaryButton type="submit">Login</PrimaryButton>
					</Stack>
				</form>
			</div>
		</div>
	);
}