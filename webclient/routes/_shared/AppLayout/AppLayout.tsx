import styles from "./AppLayout.module.scss";
 
export interface PropTypes {
	children: any;
}

export function AppLayout(props: PropTypes) {
	return (
		<div className={styles.root}>
			<div>
				
			</div>

			<div className={styles.content}>{props.children}</div>
		</div>
	);
}