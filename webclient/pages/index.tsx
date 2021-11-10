import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "../routes/login/Login";
import { Login_LoggedIn } from "../routes/login/loggedIn/LoggedIn";
import { MainPage } from "../routes/MainPage";

export default function Home() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/login/logged-in" element={<Login_LoggedIn />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<MainPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}