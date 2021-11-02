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

	public constructor(api: ExolixApi) {
		this.api = api;

		this.api.onMessage<AccountRegisterSuccessMessage>("account:register _reply:success", (message) => {
			this.triggerOnRegisterSuccess(message.Token);
		});
	}

	public registerNew(details: AccountRegisterDetails) {
		this.api.send("account:register", details);
	}

	public onRegisterSuccess(action: (token: string) => void) {
		this.onRegisterSuccessEvents.push(action);
	}

	public triggerOnRegisterSuccess(token: string) {
		this.onRegisterSuccessEvents.forEach((event) => event(token));
	}
}