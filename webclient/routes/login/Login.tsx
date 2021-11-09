import { DefaultButton, PrimaryButton, TextField } from "@fluentui/react";
import * as React from "react";
import styles from "./Login.module.scss";
import FormPage from "../_shared/FormPage.module.scss";

export function Login() {
	return (
		<div className={FormPage.root}>
			<div>
				<h1>Login</h1>
			</div>
		</div>
	);
}