import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
const store  = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
