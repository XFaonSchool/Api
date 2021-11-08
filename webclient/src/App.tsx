import { useState } from 'react'
import { Router } from 'react-router'
import './App.less'
import RouterView from './components/RouterView'
import { createBrowserHistory } from "history";
import SideBarUserItem from "./components/sideBarFriendItem/SideBarUserItem";
import { currentTheme } from './components/Theme';
import { TextField } from '@fluentui/react';

function App() {
	const [count, setCount] = useState(0)
	const history = createBrowserHistory();

	return (
		<div className="_app">
			<Router history={history}>
				<div className="side-bar">
					<div className="rail">
						<button className="rail-button">
							<div className="image">
								<img src="https://coollogo.net/wp-content/uploads/2021/03/React-logo.svg" />
							</div>
						</button>
						
						<button className="rail-button">
							<div className="image">
								<img src="https://coollogo.net/wp-content/uploads/2021/03/React-logo.svg" />
							</div>
						</button>

						<button className="rail-button">
							<div className="image">
								<img src="https://coollogo.net/wp-content/uploads/2021/03/React-logo.svg" />
							</div>
						</button>

						<button className="rail-button">
							<div className="image">
								<img src="https://coollogo.net/wp-content/uploads/2021/03/React-logo.svg" />
							</div>
						</button>
					</div>

					<div style={{
						background: currentTheme.palette.neutralLighterAlt
					}} className="content">
						<TextField />
						<SideBarUserItem userId="1b" name="z_t0ht" />
						<SideBarUserItem userId="1a" name="XFaon" presence="online" status="Writing code for Axeri" />
						<SideBarUserItem userId="1c" name="Emerald Mike" status="meow" />
						<SideBarUserItem userId="1d" name="Test Account" status="Hey, i'm an Axeri test account" presence="offline" />
					</div>
				</div>

				<div className="content">
					<RouterView />
				</div>
			</Router>
		</div>
	)
}

export default App
