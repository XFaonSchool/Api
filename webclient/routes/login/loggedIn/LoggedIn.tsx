import { Dialog, DialogFooter, Link, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

export function Login_LoggedIn() {
	if (!localStorage.getItem("token")) {
		useNavigate()("/login");
		return (<></>);
	}

	const navigate = useNavigate();

	return (
		<Dialog title="You're already logged in!" hidden={false}>
			You're already logged in. You can return to home

			<DialogFooter>
				<PrimaryButton onClick={() => navigate("/")}>Return To Home</PrimaryButton>
			</DialogFooter>
		</Dialog>
	);
}