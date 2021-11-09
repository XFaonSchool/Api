import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "../routes/Login";
import { MainPage } from "../routes/MainPage";

export default function Home() {
	return (
		<div>
			<BrowserRouter>
				<h1>Axeri</h1>
				<Link to="/login">Login</Link>
				<Link to="/">Home</Link>

				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<MainPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}