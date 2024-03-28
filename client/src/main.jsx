import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./store/store"; // Correct import path
import { ThemeProvider } from "./context/ThemeToggle.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</ThemeProvider>
				<Toaster
					toastOptions={{
						style: {
							padding: "16px",
							color: "black",
						},
						position: "bottom center", // Set the position to "bottom"
					}}
				/>
			</PersistGate>
		</Provider>
	</BrowserRouter>
);
