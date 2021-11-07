import { ExolixApi } from "@axeridev/exolix-node";

export class TransportToken {
	private api: ExolixApi;
	private onCreateEndPointErrorEvents: ((reason: "end-point-exists") => void)[] = [];

	public constructor(api: ExolixApi) {
		this.api = api;

		this.api.onMessage("token-transport:create-end-point _reply:end-point-exists", (message) => this.triggerOnCreateEndPointError("end-point-exists"));
	}

	public createEndPoint() {
		this.api.send("token-transport:create-end-point", {});
	}

	public onCreateEndPointError(action: (reason: "end-point-exists") => void) {
		this.onCreateEndPointErrorEvents.push(action);
	}

	public triggerOnCreateEndPointError(reason: "end-point-exists") {
		this.onCreateEndPointErrorEvents.forEach((event) => event(reason));
    }
}