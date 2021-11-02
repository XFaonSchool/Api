import { ExolixApi } from "@axeridev/exolix-node";

export class Guild {
	public api: ExolixApi;

	public constructor(api: ExolixApi) {
		this.api = api;
	}

	public joinGuild(identifier: string) {
		this.api.send("guild:join", {
			Identifier: identifier
		});
	}
}