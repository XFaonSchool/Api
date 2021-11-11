import { DefaultButton, Dialog, DialogFooter, PrimaryButton } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../pages/_app";

let isLoggedIn = false;
let loginRetry = true;

const events = {
    onLoginSuccess: () => { },
    onLoginFailed: (reason: string) => { },
};

api.account.onLoginTokenSuccess(() => {
    isLoggedIn = true;
    events.onLoginSuccess();
});

api.account.onLoginTokenFailed((reason) => {
    events.onLoginFailed(reason);
});

function runLoggin() {
    if (!isLoggedIn && api.ready && loginRetry) {
        api.account.loginToken(localStorage.getItem("token"));
    }
}

export function LoginManager() {
    const [status, setStatus] = useState("working");
    const [errorCode, setErrorCode] = useState("unknown");
    const goTo = useNavigate();

    events.onLoginSuccess = () => {
        setStatus("success");
    }

    events.onLoginFailed = (reason) => {
        setErrorCode(reason);
        setStatus("failed");
    }

    runLoggin();
    loginRetry = false;

    return (
        <div>
            <Dialog hidden={status != "failed"} title="Failed you log you in">
                An unexpected error occoured. We couldn't log you in!<br />
                ErrorName: <strong>{errorCode}</strong>

                <DialogFooter>
                    <PrimaryButton onClick={() => }>Go To Login</PrimaryButton>
                    <DefaultButton>Try Again</DefaultButton>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
