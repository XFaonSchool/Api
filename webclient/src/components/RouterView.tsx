import { Route, Routes } from "react-router-dom";
import Friends from "../routes/Friends";
import Main from "../routes/Main";

function RouterView() {
	return (
		<Routes>
			<Route path="/friends">
				<Friends />
			</Route>
			
			<Route path="/">
				<Main />
			</Route>
		</Routes>
	);
}

export default RouterView;