import { FontIcon, Persona, PersonaPresence, PersonaSize } from "@fluentui/react";
import { useState } from "react";
import ChatMessage from "./chatMessage/ChatMessage";
import "./Style.less";

function UserMessagesContainer() {
	const [memberListState, setMemberListState] = useState(false);

	return (
		<div className="_user-messages-container">
			<div className="main">
				<div className="messages">
					<div className="header">
						<Persona className="user" size={PersonaSize.size8} presence={PersonaPresence.away} text="Ectrix Cato" />

						<div className="right">
							<button className="toggle" onClick={() => memberListState ? setMemberListState(false) : setMemberListState(true)}>
								<FontIcon iconName="GlobalNavButton" />
							</button>
						</div>
					</div>

					<div className={"content" + (memberListState ? " under-layered" : "")}>
						<div className="blocking-cover"></div>
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
						<ChatMessage userId="Ectrix Cato" messages={["Heyy, welcome", "How are you"]} />
						<ChatMessage userId="XFaon" messages={["Uwu, test message"]} />
					</div>
				</div>

				<div className="input">
					<form>
						<div className="real-input">
							<input placeholder="Type a new message" />
						</div>
					</form>
				</div>
			</div>

			<div className={"members" + (memberListState ? " opened" : "")}>
				<div className="header">
					<span>Server Members</span>
					<button className="toggle" onClick={() => memberListState ? setMemberListState(false) : setMemberListState(true)}>
						<FontIcon iconName="GlobalNavButton" />
					</button>
				</div>

				<div className="content">
					<span>Owner</span>
					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<span>Members</span>
					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>

					<div className="user">
						<Persona className="user" text="XFaon" size={PersonaSize.size32} showSecondaryText={true} presence={PersonaPresence.dnd} secondaryText="Writing code for Axeri" />
					</div>

					<div className="user">
						<Persona className="user" text="z_t0ht" size={PersonaSize.size32} presence={PersonaPresence.offline} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserMessagesContainer;