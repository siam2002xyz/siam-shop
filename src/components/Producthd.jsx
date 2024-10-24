import React from 'react'
import { TbArrowRight } from 'react-icons/tb'

export const Producthd = ({product}) => {
  
    return (
    <div className='max-padd-container flex items-center flex-wrap gap-x-2 medium-16 py-24 capitalize bg-primary'>
        Home <TbArrowRight />Shop <TbArrowRight />{product.category} <TbArrowRight /> {product.name}
    </div>
  )
}

export default Producthd