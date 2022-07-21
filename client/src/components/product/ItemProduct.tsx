import React from 'react'
import { IProduct } from '../../types/product'
import { Link } from 'react-router-dom'
const ItemProduct: React.FC<IProduct> = ({ _id, title, description, image, category, price }) => {
  return (
    <div className='w-64 rounded-sm bg-white-700 shadow-xl hover:shadow-2xl'>
      <Link to={`product/${_id}`}>
        <img width='80%' className="rounded-sm mx-auto" src={image} alt={title} />
        <div>
          <p className='font-bold text-muted ml-7 py-1'>{title}</p>
          <p className="text-sm ml-7 text-gray-500 py-1">Category : {category}</p>
          <p className='text-sm ml-7 text-gray-500 py-1'>{description}</p>
          <p className="font-bold ml-7 text-red-500 py-1">Price : ${price} {price  && <span className="text-sm font-semibold border-red-400 border-2 bg-gray-150 ml-5 rounded-sm px-0.5 py-0.5">{price > 95 ? '-20%' : false}</span>}</p>
        </div>
      </Link>
    </div>
  )
}

export default ItemProduct