import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface IAuthState{
    user: object | undefined;
    loading: boolean;
    error: boolean;
}
const initialState: IAuthState = {
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
        loginSuccess: (state : IAuthState, action: PayloadAction<object>) =>{
            state.loading = false;
            state.user = action.payload;
        },
        loginFailed: (state : IAuthState) =>{
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
        
    },
})

export const {loginStart, loginSuccess, loginFailed, registerSuccess, registerFailed, registerStart} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;