import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	error: null,
	loading: true,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		clearUser: (state) => {
			state.user = null;
			state.loading = false;
		},
		// action to set user preferences
		updateUserPreferences: (state, action) => {
			state.user = {
				...state.user,
				themeSelected: action.payload.themeSelected,
				colorSelected: action.payload.colorSelected,
			};
		},
		// action to clear user preferences
		clearUserPreferences: (state) => {
			state.user = {
				...state.user,
				themeSelected: null,
				colorSelected: null,
			};
		},
	},
});

export const {
	setUser,
	clearUser,
	updateUserPreferences,
	clearUserPreferences,
} = authSlice.actions;

export const getUser = (state) => state.auth.user;

export const getLoading = (state) => state.auth.loading;

export default authSlice.reducer;
