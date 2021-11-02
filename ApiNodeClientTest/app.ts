import { AxeriApi } from "@axeridev/axeri-node-api/app";

const axeri = new AxeriApi();

axeri.onReady(() => {
	console.log("Bot Ready");

	axeri.account.onLoginTokenSuccess(() => {
		console.log("Logged in!");
	});

	axeri.account.onLoginTokenFailed(() => {
		console.log("Failed to login");
	});

	axeri.account.loginToken("tok.een");
});

axeri.run();