import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import { pipe, Option } from "effect";

pipe(
	document.getElementById("root"),
	Option.fromNullable,
	Option.map((root) =>
		ReactDOM.createRoot(root).render(
			<React.StrictMode>
				<Theme>
					<App />
				</Theme>
			</React.StrictMode>,
		),
	),
);
