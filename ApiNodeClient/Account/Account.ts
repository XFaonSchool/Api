import { ExolixApi } from "@axeridev/exolix-node";

export interface AccountRegisterDetails {
	UserName: string;
	DisplayName: string;
	Email: string;
	Password: string;
}

export interface AccountRegisterSuccessMessage {
	Token: string;
}

export class Account {
	private api: ExolixApi;
	private onRegisterSuccessEvents: ((token: string) => void)[] = [];
	private onLoginTokenSuccessEvents: (() => void)[] = [];
	private onLoginTokenFailedEvents: (() => void)[] = [];

	public isLoggedIn = false;

	public constructor(api: ExolixApi) {
		this.api = api;

		this.api.onMessage<AccountRegisterSuccessMessage>("account:register _reply:success", (message) => {
			this.triggerOnRegisterSuccess(message.Token);
		});

		this.api.onMessage("login _reply:success", () => this.triggerOnLoginTokenSuccess());
		this.api.onMessage("login _reply:failed", () => this.triggerOnLoginTokenFailed());
	}

	public registerNew(details: AccountRegisterDetails) {
		this.api.send("account:register", details);
	}

	public loginToken(token: string) {
		this.api.send("login", {
			Token: token
		});
	}

	public onRegisterSuccess(action: (token: string) => void) {
		this.onRegisterSuccessEvents.push(action);
	}

	public triggerOnRegisterSuccess(token: string) {
		this.onRegisterSuccessEvents.forEach((event) => event(token));
	}

	public onLoginTokenSuccess(action: () => void) {
		this.onLoginTokenSuccessEvents.push(action);
	}

	public triggerOnLoginTokenSuccess() {
		this.isLoggedIn = true;
		this.onLoginTokenSuccessEvents.forEach((event) => event());
	}

	public onLoginTokenFailed(action: () => void) {
		this.onLoginTokenFailedEvents.push(action);
	}

	public triggerOnLoginTokenFailed() {
		this.isLoggedIn = false;
		this.onLoginTokenFailedEvents.forEach((event) => event());
	}
}