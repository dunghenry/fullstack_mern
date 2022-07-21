import { getProductsStart, getProductsSuccess, getProductsFailed, getProductStart, getProductSuccess, getProductFailed } from "../slices/productSlice"
import { AppDispatch } from "..";
import type { AxiosInstance } from "axios";
export const getProducts = async (dispatch : AppDispatch, customAxios : AxiosInstance, accessToken : string) =>{
    dispatch(getProductsStart());
    try {
        const response = await customAxios.get('http://localhost:4000/api/product',{
            headers: {
                token: `Bearer ${accessToken}`,
            }
        });
        dispatch(getProductsSuccess(response.data.products));
    } catch (error : any) {
        dispatch(getProductsFailed());
    }
}

export const getProduct = async(id: string, dispatch: AppDispatch, customAxios: AxiosInstance, accessToken: string) =>{
    dispatch(getProductStart());
    try {
        const response = await customAxios.get(`http://localhost:4000/api/product/${id}`, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getProductSuccess(response.data));
    } catch (error : any) {
        dispatch(getProductFailed());
    }
}