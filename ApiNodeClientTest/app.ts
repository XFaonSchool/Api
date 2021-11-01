import { AxeriApi } from "@axeridev/axeri-node-api/app";

const axeri = new AxeriApi();

axeri.onReady(() => {
	console.log("Axeri BOT ready");

	axeri.account.registerNew();
});

axeri.run();