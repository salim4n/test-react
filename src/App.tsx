import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./layout";
import { Jeux, Administration } from "./page";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/administration" element={<Administration />} />
				<Route path="/jeux" element={<Jeux />} />
			</Routes>
		</div>
	);
}

export default App;
