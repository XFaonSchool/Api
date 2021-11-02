import { AxeriApi } from "@axeridev/axeri-node-api/app";

const axeri = new AxeriApi();

axeri.onReady(() => {
	axeri.account.onLoginTokenSuccess(() => {
		console.log("Logged in!");
	});

	axeri.account.loginToken("tok.en");
});

axeri.run();