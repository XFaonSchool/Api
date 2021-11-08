import { Persona, PersonaPresence, PersonaSize } from "@fluentui/react";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { currentTheme } from "../Theme";
import "./Style.less";

export interface PropType {
	name: string;
	status?: string;
	presence?: "online" | "away" | "dnd" | "blocked" | "offline";
	userId: string;
}

function SideBarUserItem(props: PropType) {
	const history = useHistory();

	function handleClick() {
		history.push("/dm/" + props.userId);
	}

	return (
		<NavLink style={
			{
				background: currentTheme.palette.neutralLighter
			}
		} className="_side-bar-user-item" exact={true} to={"/dm/" + props.userId}>
			<Persona
				secondaryText={props.status}
				text={props.name}
				showSecondaryText={props.status && (props.presence ?? "offline") != "offline" ? true : false}
				size={PersonaSize.size32}
				presence={PersonaPresence[props.presence ?? "offline"]}
			/>
		</NavLink>
	);
}

export default SideBarUserItem;