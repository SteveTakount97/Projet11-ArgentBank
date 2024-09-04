// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    userName: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.token = action.payload.token
            state.firstName = action.payload.firstName; // poour stocker le prenom
            state.userName = action.payload.userName
            state.lastName = action.payload.lastName;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.isLoggedIn = false;
        },
        updateUser: (state, action) => {
            // Met à jour uniquement les champs qui sont présents dans le payload
            if (typeof action.payload.userName === 'string' && action.payload.userName.trim()) {
                state.userName = action.payload.userName;
            }
             }
    },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
