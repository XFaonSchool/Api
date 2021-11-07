import { ExolixApi } from "@axeridev/exolix-node";

export interface ReceiveTokenMessage {
	Token: string;
}

export interface EndPointCreatedResponse {
	Identifier: string;
}

export interface EndPointSendMessage {
	Identifier: string;
	Token: string;
}

export class TransportToken {
	private api: ExolixApi;
	private onCreateEndPointErrorEvents: ((reason: "end-point-exists") => void)[] = [];
	private onTokenResponseEvents: ((token: string) => void)[] = [];
	private onCreateEndPointSuccessEvents: ((identifier: string) => void)[] = [];

	public constructor(api: ExolixApi) {
		this.api = api;

		this.api.onMessage("token-transport:create-end-point _reply:end-point-exists", (message) => this.triggerOnCreateEndPointErrorEvents("end-point-exists"));
		this.api.onMessage<ReceiveTokenMessage>("token-transport:receive-token", (message) => this.triggerOnTokenResponseEvents(message.Token));
		this.api.onMessage<EndPointCreatedResponse>("token-transport:create-end-point _reply:success", (message) => this.triggerOnCreateEndPointSuccessEvents(message.Identifier));
	}

	public createEndPoint() {
		this.api.send("token-transport:create-end-point", {});
	}

	public sendToEndPoint(identifier: string, token: string) {
		this.api.send<EndPointSendMessage>("token-transport:send", {
			Token: token,
			Identifier: identifier
		});
    }

	public onCreateEndPointError(action: (reason: "end-point-exists") => void) {
		this.onCreateEndPointErrorEvents.push(action);
	}

	private triggerOnCreateEndPointErrorEvents(reason: "end-point-exists") {
		this.onCreateEndPointErrorEvents.forEach((event) => event(reason));
	}

	public onTokenResponse(action: (token: string) => void) {
		this.onTokenResponseEvents.push(action);
	}

	private triggerOnTokenResponseEvents(token: string) {
		this.onTokenResponseEvents.forEach((event) => event(token));
	}

	public onCreateEndPointSuccess(action: (identifier: string) => void) {
		this.onCreateEndPointSuccessEvents.push(action);
	}

	private triggerOnCreateEndPointSuccessEvents(identifier: string) {
		this.onCreateEndPointSuccessEvents.forEach((event) => event(identifier));
    }
}