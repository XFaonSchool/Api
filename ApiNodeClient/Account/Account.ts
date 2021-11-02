import { ExolixApi } from "@axeridev/exolix-node";

export interface AccountRegisterDetails {
	UserName: string;
	DisplayName: string;
	Email: string;
	Password: string;
}

export class Account {
	private api: ExolixApi;

	public constructor(api: ExolixApi) {
		this.api = api;
	}

	public registerNew(details: AccountRegisterDetails) {
		this.api.send("account:register", details);
	}
}