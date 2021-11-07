import { ExolixApi } from "@axeridev/exolix-node";

export class TransportToken {
	public api: ExolixApi;

	public constructor(api: ExolixApi) {
		this.api = api;
	}

	public createEndPoint() {
		this.api.send("token-transport:create-end-point", {});
    }
}