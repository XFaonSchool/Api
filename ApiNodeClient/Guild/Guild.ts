import { ExolixApi } from "@axeridev/exolix-node";

export interface GuildJoinReturnMessage {
	Identifier: string;
}

export class Guild {
	public api: ExolixApi;

	private onJoinSuccessEvents: ((identifier: string) => void)[] = [];
	private onJoinFailedEvents: ((identifier: string, reason: "member-already-exists" | "banned") => void)[] = [];

	public constructor(api: ExolixApi) {
		this.api = api;

		api.onMessage<GuildJoinReturnMessage>("guild:join _reply:success", (message) => {

		});
	}

	public joinGuild(identifier: string) {
		this.api.send("guild:join", {
			Identifier: identifier
		});
	}

	public onJoinSuccess(action: (identifier: string) => void) {
		this.onJoinSuccessEvents.push(action);
	}

	public onJoinFailed(action: (identifier: string, reason: "member-already-exists" | "banned") => void) {
		this.onJoinFailedEvents.push(action);
	}
}