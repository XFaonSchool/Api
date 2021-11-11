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

export interface LoginGetTokenMessage {
	Token: string;
}

export interface LoginDetails {
	EmailUserName: string;
	Password: string;
}

export interface LoginErrorResponse {
	EmailUserName: string;
}

export class Account {
	private api: ExolixApi;
	private onRegisterSuccessEvents: ((token: string) => void)[] = [];
	private onLoginGetTokenSuccessEvents: ((token: string) => void)[] = [];
	private onLoginTokenSuccessEvents: (() => void)[] = [];
	private onLoginTokenFailedEvents: ((reason: "already-logged-in" | "invalid" | "already-trying-login") => void)[] = [];
	private onLoginGetTokenFailedEvents: ((reason: "bad-auth" | "invalid-account" | "missing-user-name-email") => void)[] = [];

	public isLoggedIn = false;

	public constructor(api: ExolixApi) {
		this.api = api;

		this.api.onMessage<AccountRegisterSuccessMessage>("account:register _reply:success", (message) => {
			this.triggerOnRegisterSuccess(message.Token);
		});

		this.api.onMessage("login _reply:success", () => this.triggerOnLoginTokenSuccess());
		this.api.onMessage("login _reply:invalid", () => this.triggerOnLoginTokenFailedEvents("invalid"));
		this.api.onMessage("login _reply:already-logged-in", () => this.triggerOnLoginTokenFailedEvents("already-logged-in"));
		this.api.onMessage("login _reply:already-trying-login", () => this.triggerOnLoginTokenFailedEvents("already-trying-login"));

		this.api.onMessage<LoginGetTokenMessage>("account:login-get-token _reply:success", (message) => this.triggerOnLoginGetTokenSuccess(message.Token));
		this.api.onMessage<LoginErrorResponse>("account:login-get-token _reply:bad-auth", (message) => this.triggerOnLoginGetTokenFailedEvents("bad-auth"));
		this.api.onMessage<LoginErrorResponse>("account:login-get-token _reply:does-not-exist", (message) => this.triggerOnLoginGetTokenFailedEvents("invalid-account"));
		this.api.onMessage<LoginErrorResponse>("account:login-get-token _reply:missing-user-name-email", (message) => this.triggerOnLoginGetTokenFailedEvents("missing-user-name-email"));
	}

	public registerNew(details: AccountRegisterDetails) {
		this.api.send("account:register", details);
	}

	public loginToken(token: string) {
		this.api.send("login", {
			Token: token
		});
	}

	public loginGetToken(details: LoginDetails) {
		this.api.send<LoginDetails>("account:login-get-token", details);
	}

	public onRegisterSuccess(action: (token: string) => void) {
		this.onRegisterSuccessEvents.push(action);
	}

	private triggerOnRegisterSuccess(token: string) {
		this.onRegisterSuccessEvents.forEach((event) => event(token));
	}

	public onLoginTokenSuccess(action: () => void) {
		this.onLoginTokenSuccessEvents.push(action);
	}

	public onLoginGetTokenSuccess(action: (token: string) => void) {
		this.onLoginGetTokenSuccessEvents.push(action);
	}

	private triggerOnLoginGetTokenSuccess(token: string) {
		this.onLoginGetTokenSuccessEvents.forEach((event) => event(token));
	}

	public onLoginGetTokenFailed(action: (reason: "bad-auth" | "invalid-account") => void) {
		this.onLoginGetTokenFailedEvents.push(action);
	}

	private triggerOnLoginGetTokenFailedEvents(reason: "bad-auth" | "invalid-account" | "missing-user-name-email") {
		this.onLoginGetTokenFailedEvents.forEach((event) => event(reason));
	}

	private triggerOnLoginTokenSuccess() {
		this.isLoggedIn = true;
		this.onLoginTokenSuccessEvents.forEach((event) => event());
	}

	public onLoginTokenFailed(action: (reason: "already-logged-in" | "invalid" | "already-trying-login") => void) {
		this.onLoginTokenFailedEvents.push(action);
	}

	private triggerOnLoginTokenFailedEvents(reason: "already-logged-in" | "invalid" | "already-trying-login") {
		this.isLoggedIn = false;
		this.onLoginTokenFailedEvents.forEach((event) => event(reason));
	}
}