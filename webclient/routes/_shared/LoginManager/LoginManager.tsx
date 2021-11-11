import { Dialog } from "@fluentui/react";
import { useState } from "react";
import { api } from "../../../pages/_app";

let isLoggedIn = false;

const events = {
    onLoginSuccess: () => { },
    onLoginFailed: () => { },
};

api.account.onLoginTokenSuccess(() => {
    isLoggedIn = true;
    events.onLoginSuccess();
});

function runLoggin() {
    if (!isLoggedIn && api.ready) {
        api.account.loginToken("tok.en");
    }
}

export function LoginManager() {
    const [status, setStatus] = useState("working");

    events.onLoginSuccess = () => {
        setStatus("success");
    }

    runLoggin();

    return (
        <div>
            {status == "working"
                ? <h1>Logging In...</h1>
                : (status == "success"
                    ? <h1>Logged In</h1>
                    : <h1>Failed to login</h1>)
            }

            <Dialog hidden={true} title="Failed you log you in">
                An unexpected error occoured. We couldn't log you in!
            </Dialog>
        </div>
    );
}
