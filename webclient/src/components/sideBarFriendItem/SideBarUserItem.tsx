import { Persona, PersonaPresence, PersonaSize } from "@fluentui/react";
import { NavLink } from "react-router-dom";
import { currentTheme } from "../Theme";
import "./Style.less";

export interface PropType {
	name: string;
	status?: string;
	presence?: "online" | "away" | "dnd" | "blocked" | "offline";
	userId: string;
}

function SideBarUserItem(props: PropType) {
	return (
		<NavLink style={
			{
				background: currentTheme.palette.neutralLighter
			}
		} className="_side-bar-user-item" to={"/dm/" + props.userId}>
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