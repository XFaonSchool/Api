import { AxeriApi } from "@axeridev/axeri-node-api/app";

const axeri = new AxeriApi();

axeri.onReady(() => {
	console.log("Bot Ready");

	axeri.account.onLoginTokenSuccess(() => {
		console.log("Logged in!");

		//axeri.guild.onJoinSuccess((id) => {
		//	console.log("Guild: Joined '" + id + "'");
		//});

		//axeri.guild.onJoinFailed((id, reason) => {
		//	console.log("Guild Error: Failed to join '" + id + "' for reason '" + reason + "'");
		//});

		//axeri.guild.joinGuild("g:1a");
	});

	axeri.account.onLoginTokenFailed(() => {
		console.log("Failed to login");
	});

	axeri.account.onLoginGetTokenSuccess((token) => {
		console.log(token);
		axeri.account.loginToken(token);
	});

	axeri.account.loginGetToken({
		EmailUserName: "XFaon",
		Password: "pass-word"
	});
});

axeri.run();