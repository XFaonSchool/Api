import { AxeriApi } from "@axeridev/axeri-node-api/App";

const axeri = new AxeriApi({
	port: 7090
});

axeri.onReady(() => {
	console.log("Axeri's bot is ready");
	let endPointIdentifier = "";

	axeri.account.onLoginTokenSuccess(() => {
		console.log("Account logged in");
	});

	axeri.account.onLoginTokenFailed((reason) => {
		console.log("Failed to login with token because \"" + reason + "\"");
	});

	axeri.account.onLoginGetTokenSuccess((token) => {
		axeri.transportToken.sendToEndPoint(endPointIdentifier, token);
	});

	axeri.transportToken.onCreateEndPointSuccess((identifier) => {
		console.log("Created new endpoint at " + identifier);
		endPointIdentifier = identifier;

		axeri.account.loginGetToken({
			EmailUserName: "XFaon",
			Password: "pass-word"
		});
	});

	axeri.transportToken.onTokenResponse((token) => {
		console.log("Message received from end point, token = " + token);
		axeri.account.loginToken(token);
	});

	axeri.transportToken.createEndPoint();
});

axeri.run();