import { loginStart, loginSuccess, loginFailed, registerFailed, registerStart, registerSuccess, logoutFailed, logoutSuccess, logoutnStart } from "../slices/authSlice"
import { AppDispatch } from ".."
import type { NavigateFunction } from 'react-router-dom'
import { ILogin } from "../../types";
import axios, { AxiosInstance } from 'axios';
export const login = async (user: ILogin, dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(loginStart());
    try {
        const response = await axios.post('api/auth/login', user);
        if(response.data){
            dispatch(loginSuccess(response.data));
            navigate('/');
        }
    } catch (error : any) {
        dispatch(loginFailed());
    }
}

export const register = async (user: ILogin, dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(registerStart());
    try {
        const response = await axios.post('api/auth/register', user);
        if(response.data){
            dispatch(registerSuccess());
            navigate('/login');
        }
    } catch (error: any) {
        dispatch(registerFailed());
    }
}

export const logout = async (id: string, dispatch: AppDispatch, navigate: NavigateFunction, customAxios : AxiosInstance, accessToken: string) => {
    dispatch(logoutnStart());
    try {
        if(id){
            const response = await customAxios.post('api/auth/logout', id, {
                headers: {
                    token: `Bearer ${accessToken}`,
                }
            });
            dispatch(logoutSuccess());
            navigate('/login');
        }
    } catch (error: any) {
        console.log(error.message);
        dispatch(logoutFailed());
    }
}