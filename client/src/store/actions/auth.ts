import { loginStart, loginSuccess, loginFailed, registerFailed, registerStart, registerSuccess} from "../slices/authSlice"
import { AppDispatch } from ".."
import type { NavigateFunction } from 'react-router-dom'
import { ILogin } from "../../types";
import axios from 'axios';
export const login = async (user: ILogin, dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(loginStart());
    try {
        const response = await axios.post('api/auth/login', user);
        if(response.data){
            dispatch(loginSuccess(response.data));
            navigate('/');
        }
    } catch (error) {
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
    } catch (error) {
        dispatch(registerFailed());
    }
}