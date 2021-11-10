import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "../routes/login/Login";
import { MainPage } from "../routes/MainPage";

export default function Home() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<MainPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}