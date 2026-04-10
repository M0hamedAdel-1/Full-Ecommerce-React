import { useContext } from 'react'
import "./cart.css"
import { MdShoppingBasket } from "react-icons/md";
import { Link } from 'react-router-dom';
import { CartContext } from '../../components/context/CartContext';
import ProductinCart from '../../components/productinCart/ProductinCart';
const Cart = () => {
  const {cartitems} = useContext(CartContext)
   
  const totalPrice = cartitems.reduce((acc,item)=>{
    return acc + item.price * item.quantity
  },0)
  
  return (
    <div className='cart'>
        <img className='one_img' src='../../../imgs/pill-shape.png'/>
        <div className='container' data-aos="fade-up">
          <h1>Cart <MdShoppingBasket/> </h1>
            {cartitems.length ===0?
            (
              <div className='empty_cart'>
                <h2>Your Cart is Empty</h2>
                <Link to='/products'>Browse products</Link>
              </div>
            ):(
                <div className='products'>
                {cartitems.map((item)=>(
                <ProductinCart key={item.id} item={item} />
                ))}
                
                </div>
            )}
            <div className='check_out'>
              <h2>Total Price</h2>
              <p>${totalPrice.toFixed(2)}</p>
              <button >Process To Checkout</button>
              
            </div>
            
        </div>
    </div>
  )
}

export default Cart

          