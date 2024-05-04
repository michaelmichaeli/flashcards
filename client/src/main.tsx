import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Deck from "./Deck.tsx";

import "./index.css";

const browserRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/deck/:deckId",
		element: <Deck />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={browserRouter} />
	</React.StrictMode>
);
