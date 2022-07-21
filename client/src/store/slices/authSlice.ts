import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IUser{
    _id?: string;  
    username: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    accessToken: string;  
}
interface IAuthState{
    user?: IUser;
    loading: boolean;
    error: boolean;
}
const initialState:IAuthState = {
    user: undefined,
    loading: false,
    error: false,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state : IAuthState) =>{
            state.loading = true;
        },
        loginSuccess: (state : IAuthState, action: PayloadAction<IUser>) =>{
            state.loading = false;
            state.user = action.payload;
        },
        loginFailed: (state : IAuthState) =>{
            state.loading = false;
            state.error = true;
        },
        registerStart: (state : IAuthState) =>{
            state.loading = true;
        },
        registerSuccess: (state : IAuthState) =>{
            state.loading = false;
        },
        registerFailed: (state : IAuthState) =>{
            state.loading = true;
        },
        logoutnStart: (state : IAuthState) =>{
            state.loading = true;
        },
        logoutSuccess: (state : IAuthState) =>{
            state.loading = false;
            state.user = undefined
        },
        logoutFailed: (state : IAuthState) =>{
            state.loading = false;
            state.error = true;
        }
    },
})

export const {loginStart, loginSuccess, loginFailed, registerSuccess, registerFailed, registerStart, logoutFailed, logoutSuccess, logoutnStart} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;