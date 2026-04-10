import React, { useContext } from 'react'
import "./productincart.css"
import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { CartContext } from '../context/CartContext';

const ProductinCart = ({item}) => {

    
    const {removefromcart,handleincreasebutton,handledecreasebutton} = useContext(CartContext)
    
  return (
    <div>
        <div className='product_in_cart'>
                <div className='image'>
                    <Link to={`/products/${item.id}`}>
                    <img src={item.imageUrl || "/default.png"}/>
                    </Link>
                </div>
                <div className='content'>
                    <Link to={`/products/${item.id}`}>
                    <h2>{item.name}</h2>
                    </Link>
                    <p>{item.productCategory}</p>
                    <p className='color-size'>
                        
                        <span>{item.color}</span>
                        | <span>{item.size}</span></p>
                        
                    <div className='quantity'>
                        <button onClick={()=>handleincreasebutton(item)}>+</button>
                        <span>{item.quantity}</span>
                        <button onClick={()=>handledecreasebutton(item)}>-</button>
                    </div>


                    <p className='price'>${item.price}</p>
                </div>
                <div onClick={()=>{removefromcart(item.id)}} className='close_icon'>
                        <IoMdClose/>
                </div>
        </div>
    </div>
  )
}

export default ProductinCart
