import { configureStore } from "@reduxjs/toolkit";
import useReducer from '../redux/userSlice';

export const store = configureStore ({
    reducer: {
        user: useReducer,
    },
});

export default store;