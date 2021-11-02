import { AxeriApi } from "@axeridev/axeri-node-api/app";
import readline from "readline";

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
		axeri.account.loginToken(token);
	});

	axeri.account.onLoginGetTokenFailed((reason) => {
		console.log("Failed to login because reason '" + reason + "'");
	});

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	let username = "";
	let password = "";

	rl.question("UserName: ", (ans) => {
		username = ans;

		rl.question("Password: ", (ans) => {
			password = ans;

			axeri.account.loginGetToken({
				EmailUserName: username,
				Password: password
			});
		});
	});
});

axeri.run();