import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../store/actions/product'
import { loginSuccess } from '../../store/slices/authSlice';
import { customAxios } from '../../store/api';
import { AxiosInstance } from 'axios';
import Loading from '../../components/global/Loading';
import './product_detail.scss'
const ProductDetail = () => {
    const { user } = useAppSelector(state => state.auth)
    const { product, loading } = useAppSelector(state => state.product)
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>()
    let axios: AxiosInstance;
    if (user?._id) {
        axios = customAxios(user, dispatch, loginSuccess)
    }
    useEffect(() => {
        if (user?._id && id) {
            getProduct(id, dispatch, axios, user?.accessToken)
        }
    }, [id])
    return (
        <section className='product_info'>
            {
                product &&
                <>
                    <img src={product.image} alt={product.image} />
                    <div className='box'>
                        <h2>{product.title}</h2>
                        <h3>Price : ${product.price}</h3>
                        <p>{product.description}</p>
                        <h4>Category: {product.category}</h4>
                        <button>Add to cart</button>
                    </div>
                </>
            }

            {loading && <Loading />}
        </section>
    )

}

export default ProductDetail;