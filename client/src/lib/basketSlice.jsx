import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
};

const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addItem: (state, action) => {
			state.cartItems = [...state.cartItems, action.payload];
		},

		removeItem: (state, action) => {
			const newBasket = [...state.cartItems];
			const index = state.cartItems.findIndex(
				(item) => item.id === action.payload
			);

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`Can't remove product (id: ${action.payload}) as its not in basket`
				);
			}

			state.cartItems = newBasket;
		},

		clearBasket: (state, action) => {
			state.cartItems = [];
		},
	},
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;

export const getBasketItems = (state) => state?.basket?.cartItems;

export const getBasketItem = (state, id) =>
	state?.basket?.cartItems.filter((item) => item.id === id);

export const getBasketTotal = (state) =>
	state?.basket?.cartItems.reduce((total, item) => (total += item?.price), 0);

export default basketSlice.reducer;
