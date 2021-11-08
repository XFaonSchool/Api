import { AxeriApi } from "@axeridev/axeri-node-api/App";

const axeri = new AxeriApi({
    port: 7090
});

axeri.onReady(() => {
    console.log("Axeri's bot is ready");

    axeri.account.onLoginTokenSuccess(() => {
        console.log("Account logged in");


    });

    axeri.account.onLoginTokenFailed((reason) => {
        console.log("Failed to login with token because \"" + reason + "\"");
    });

    axeri.account.onLoginGetTokenSuccess((token) => {
        axeri.account.loginToken(token);
    });

    axeri.account.loginGetToken({
        EmailUserName: "XFaon",
        Password: "pass-word"
    });
});

axeri.run();