import React, { useContext } from 'react'
import "./favorites.css"

import { MdFavoriteBorder } from "react-icons/md";
import Product from '../product/Product'
import Emptycomponent from '../../components/empty/Emptycomponent';

import { CartContext } from '../../components/context/CartContext';
const Favorites = () => {
  const {favorites} = useContext(CartContext)
  return (
    <div className='favorites'>
      
      <img className='top_image' src='../../../imgs/pill-shape.png'/>
      
      <div className='container'>
        <h1 className='heading' data-aos="fade-up">Favorites <MdFavoriteBorder/> </h1>

      {
        favorites.length > 0 ?  <div className='fav-products ' data-aos="fade-up" >
          {
              favorites.map((item)=>(
            <Product key={item.id} item={item}/>
          ))
          }
        </div> : 
          <div data-aos="fade-up">
            <Emptycomponent  heading1="No Favorites Yet" paragraph= "Your Favorites items will appear here"/>
            </div>
        
      }



        </div> 
    </div>
  )
}

export default Favorites
