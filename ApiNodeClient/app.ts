import { ExolixApi } from "@axeridev/exolix-node";
import deepmerge from "deepmerge";
import { Account } from "./Account/Account";
import { Guild } from "./Guild/Guild";

export class AxeriApiSettings {
	port?: number;
}

export class AxeriApi {
	private api: ExolixApi;
	private onReadyEvents: (() => void)[] = [];

	public account: Account;
	public guild: Guild;

	public constructor(settings: AxeriApiSettings = {}) {
		settings = deepmerge <AxeriApiSettings>({
			port: 1427
		}, settings);
	
		this.api = new ExolixApi({
			port: settings.port
		});

		this.account = new Account(this.api);
		this.guild = new Guild(this.api);

		this.api.onOpen(() => {
			this.triggerOnReadyEvents();
		});

		// TODO: Wait for OnReady support for ExolixAPI
		//this.api.onReady(() => {
		//	this.triggerOnReadyEvents();
		//});
	}

	public run() {
		this.api.run();
	}

	public onReady(action: () => void) {
		this.onReadyEvents.push(action);
	}

	public triggerOnReadyEvents() {
		this.onReadyEvents.forEach((event) => event());
	}
}
