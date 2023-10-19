import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="App-header">
			<Link to="/administration" className="nav-button">
				<h1>Administration</h1>
			</Link>
			<Link to="/jeux" className="nav-button">
				<h1>Jouer</h1>
			</Link>
		</header>
	);
}

export default Header;
