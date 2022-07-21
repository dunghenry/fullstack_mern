import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product.d"
interface IStateProduct{
    product: IProduct | null;
    products: [IProduct] | [];
    loading: boolean;
    error: boolean;
}
const initialState : IStateProduct = {
    product: null,
    products: [],
    loading: false,
    error: false
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        getProductsStart: (state: IStateProduct) =>{
            state.loading = true;
        },
        getProductsSuccess: (state: IStateProduct, action: PayloadAction<[IProduct]>) =>{
            state.loading = false;
            state.products = action.payload
        },
        getProductsFailed: (state: IStateProduct) =>{
            state.loading = false;
            state.error = true;
        },
        getProductStart: (state: IStateProduct) =>{
            state.loading = true;
        },
        getProductSuccess: (state: IStateProduct, action: PayloadAction<IProduct>) =>{
            state.loading = false;
            state.product = action.payload;
        },
        getProductFailed: (state : IStateProduct) =>{
            state.loading = false;
            state.error = true;
        }

    }
})
export const {getProductsStart, getProductsSuccess, getProductsFailed, getProductStart, getProductSuccess, getProductFailed} = productSlice.actions;
const productReducer = productSlice.reducer
export default productReducer;