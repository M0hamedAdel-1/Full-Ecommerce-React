import React, { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

import "./product.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext";
const Product = ({ item }) => {
  const {cartitems, addToCart ,removefromcart,handleTogglefavorite,favorites} = useContext(CartContext); 


  const isInCart = cartitems.some(p => p.id === item.id);
  const isinfav = favorites.some((p)=>p.id === item.id)
  const handleAddtocart = ()=>{

    if(!isInCart){
      const variant = item.variants?.[0]
      addToCart({...item,color:variant.color,size:variant.sizes[0].size})
    }
  }
  const handleRemoveFromcart = ()=>{
    removefromcart(item.id)
  }

  // handle Add to favorites
  const handleAddtofavorites= ()=>{
    
      handleTogglefavorite(item)
    
  }  
  
  return (
    <>
      <div className="product ">
        <div className="product_content">
          <div className="icons">
            <div  className="icon">

              {isInCart?<button onClick={handleRemoveFromcart}>
                < IoCloseSharp/>
              </button>:
              <button  onClick={handleAddtocart}><CiShoppingCart/></button>
               } 
            </div>

            <div className={`icon ${isinfav?"in_fav":"not_fav"} `}>
                
              <button onClick={handleAddtofavorites}>
              {isinfav ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </div>

          </div>
          <Link to={`/products/${item.id}`} className="image">
            <img src={item.imageUrl} alt="product" />
          </Link>

          <Link to={`/products/${item.id}`}>
            <h3>{item.name}</h3>
          </Link>

          <div
            className="p-desc"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
          <div className="category_price">
            <p>{item.productCategory}</p>

            {item.hasDiscount ? (
              <div className="price">
                <p className="old_price">${item.priceBeforeDiscount}</p>
                <p className="current_price">${item.price}</p>
              </div>
            ) : (
              <p className="current_price">${item.price}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
