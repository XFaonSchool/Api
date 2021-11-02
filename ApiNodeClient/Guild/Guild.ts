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

		api.onMessage<GuildJoinReturnMessage>("guild:join _reply:success", (message) => this.triggerOnJoinSuccessEvents(message.Identifier));
		api.onMessage<GuildJoinReturnMessage>("guild:join _reply:banned", (message) => this.triggerOnJoinFailedEvents(message.Identifier, "banned"));
		api.onMessage<GuildJoinReturnMessage>("guild:join _reply:member-already-exist", (message) => this.triggerOnJoinFailedEvents(message.Identifier, "member-already-exists"));
	}

	public joinGuild(identifier: string) {
		this.api.send("guild:join", {
			Identifier: identifier
		});
	}

	public onJoinSuccess(action: (identifier: string) => void) {
		this.onJoinSuccessEvents.push(action);
	}

	public triggerOnJoinSuccessEvents(identifier: string) {
		this.onJoinSuccessEvents.forEach((event) => event(identifier));
	}

	public onJoinFailed(action: (identifier: string, reason: "member-already-exists" | "banned") => void) {
		this.onJoinFailedEvents.push(action);
	}

	public triggerOnJoinFailedEvents(identifier: string, reason: "member-already-exists" | "banned") {
		this.onJoinFailedEvents.forEach((event) => event(identifier, reason));
	}
}