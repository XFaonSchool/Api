import { ExolixApi } from "@axeridev/exolix-node";

export class AxeriApi {
	private api: ExolixApi;

	public constructor() {
		this.api = new ExolixApi({
			port: 7090
		});

		this.api.onOpen(() => {
			console.log("opened");
		});

		this.api.run();
	}
}

new AxeriApi();