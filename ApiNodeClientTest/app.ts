import { AxeriApi } from "@axeridev/axeri-node-api/app";

const axeri = new AxeriApi();

axeri.onReady(() => {
	console.log("Axeri BOT ready");

	axeri.account.registerNew({
		UserName: "Test" + new Date(),
		Password: "test-pass",
		Email: new Date() + "@gmail.com",
		DisplayName: "Same Uwu Name"
	});
});

axeri.run();