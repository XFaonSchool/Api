import { Switch, Route } from "react-router-dom";
import Friends from "../routes/Friends";
import Main from "../routes/Main";

function RouterView() {
	return (
		<Switch>
			<Route path="/friends">
				<Friends />
			</Route>
			
			<Route path="/">
				<Main />
			</Route>
		</Switch>
	);
}

export default RouterView;