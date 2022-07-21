import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProducts } from '../../store/actions/product'
import { customAxios } from '../../store/api';
import { loginSuccess } from '../../store/slices/authSlice';
import { AxiosInstance } from 'axios';
import ListProduct from '../../components/product';
import Loading from '../../components/global/Loading';
const Home = () => {
  const { user } = useAppSelector(state => state.auth);
  const { products, loading } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  let axios: AxiosInstance;
  if (user) {
    axios = customAxios(user, dispatch, loginSuccess);
  }
  React.useEffect(() => {
    if (user) {
      getProducts(dispatch, axios, user?.accessToken)
    }
  }, [])
  return (
    <>
      {
        products.length ? <ListProduct products={products} /> : ""
      }
      {
        loading && <Loading />
      }
    </>
  )
}

export default Home;