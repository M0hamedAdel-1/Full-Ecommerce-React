import React from 'react'
import Products from './products/Products'
import ProductsLoading from './products/ProductsLoading'
import SaveTime from '../components/savetime/SaveTime'

const Home = () => {
  return (
    <>
      <div className='landing'>
        
        <div className='container'>
                 <div className='content' data-aos="fade-down">
                    <h1 >Purchase Your Shoes Now</h1>
                    <p >Shoes that keep kids feet comfortable all day long.</p>
                </div>
        </div>
      </div>
      <Products/>
      <SaveTime/>
    </>
  )
}

export default Home
