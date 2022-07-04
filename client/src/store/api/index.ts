import axios from "axios";
import type { AxiosInstance  } from "axios";
import jwt_decode from "jwt-decode";
import { AppDispatch } from "../";
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {Idecoded} from '../../types'
const refreshToken = async () =>{
    try {
        const response =  await axios.post('api/auth/refresh', {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// interface Idecoded{
//     userId: string;
//     isAdmin: boolean;
//     exp: number;
//     iat: number;
// }

export const customAxios = (user: {accessToken: string}, dispatch: AppDispatch, stateSuccess: ActionCreatorWithPayload<any, string>) =>{
    const API : AxiosInstance = axios.create();
    API.interceptors.request.use(async (config) =>{
        let date = new Date();
        const decoded : Idecoded = jwt_decode(user?.accessToken);
        if(decoded?.exp < date.getTime() / 1000){
            const data = await refreshToken();
            const newUser = {
                ...user,
                accessToken: user?.accessToken
            }
            dispatch(stateSuccess(newUser));
            config.headers = {
                token: `Bearer ${data?.accessToken}`
            };
        }
        return config;
    }, (error) =>{
        return Promise.reject(error);
    })
}