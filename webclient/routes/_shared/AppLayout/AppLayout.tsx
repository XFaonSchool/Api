import { useState } from "react";
import { api } from "../../../pages/_app";
import styles from "./AppLayout.module.scss";
 
export interface PropTypes {
	children: any;
}

let apiOnReady = () => { };

api.onReady(() => {
	apiOnReady();
});

export function AppLayout(props: PropTypes) {
	const [apiReady, setApiReady] = useState(api.ready);

	apiOnReady = () => setApiReady(api.ready);

	return (
		<div className={styles.root}>
			{!apiReady ? <div>Connecting...</div> : null}

			<div>
				
			</div>

			{apiReady ? <div className={styles.content}>{props.children}</div> : null}
		</div>
	);
}