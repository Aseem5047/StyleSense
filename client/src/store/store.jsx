import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../lib/basketSlice";
import authReducer from "../lib/authSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
	basket: basketReducer,
	auth: authReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Ignore the non-serializable check for redux-persist
		}).concat(thunk),
});
