import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import calenderSlice from "./Slices/Calender/calender.slice";
import usersSlice from "./Slices/Users/users.slice";
export const rootReducer = combineReducers({
	users:usersSlice,
	calender:calenderSlice
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware(),
});
