import { AxeriApi } from "@axeridev/axeri-node-api/app";

const axeri = new AxeriApi();

axeri.onReady(() => {
	console.log("Bot Ready");

	axeri.account.onLoginTokenSuccess(() => {
		console.log("Logged in!");

		axeri.guild.joinGuild("g:1a");
	});

	axeri.account.onLoginTokenFailed(() => {
		console.log("Failed to login");
		process.exit(0);
	});

	axeri.account.loginToken("tok.en");
});

axeri.run();