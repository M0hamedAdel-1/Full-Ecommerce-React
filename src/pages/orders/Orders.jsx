import React from 'react'
import "./orders.css"
import { FaRecordVinyl } from "react-icons/fa6";

import Product from '../product/Product'
import Emptycomponent from '../../components/empty/Emptycomponent';
import Order from './Order';
const Orders = () => {
  return (
    <div className='orders' >
      <img src='../../../public/imgs/pill-shape.png'/>
      <div className='container' data-aos="fade-up">
        <h1 className='heading' data-aos="fade-up">Orders <FaRecordVinyl/></h1>
        {/* <Emptycomponent heading1="No Orders Yet" paragraph="Your ordered items will appear here"/> */}
        <Order/>
      </div> 
    </div>
  )
}

export default Orders
