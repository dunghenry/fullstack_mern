import React from 'react'
import ItemProduct from './ItemProduct';
import { IProducts } from '../../types/product.d'
const ListProduct: React.FC<IProducts> = ({ products }) => {

  return (
    <>
      <div className="flex flex-wrap items-center justify-between max-w-6xl px-4 mx-auto">
        {
          products.length && products.map((product, index) => <ItemProduct key={index} {...product} />)
        }
      </div>
    </>
  )
}

export default ListProduct