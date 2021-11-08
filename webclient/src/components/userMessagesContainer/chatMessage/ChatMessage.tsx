import { Persona, PersonaSize } from "@fluentui/react";
import { currentTheme } from "../../Theme";
import "./Style.less";

export interface PropType {
	userId: string;
	messages: string[];
}

function ChatMessage(props: PropType) {
	return (
		<div style={{
			background: currentTheme.palette.neutralLighterAlt
		}} className="_chat-message">
			<div className="user">
				<Persona size={PersonaSize.size32} text={props.userId} />
				
				<span className="time">
					Today 5 minutes ago
				</span>
			</div>

			<div className="message-lines">
				{props.messages.map((message) => {
					return (<span>{message}</span>)
				})}
			</div>
		</div>
	);
}

export default ChatMessage;