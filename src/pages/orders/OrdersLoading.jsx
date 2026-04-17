import React from 'react'
import { ThreeDot } from 'react-loading-indicators'

const OrdersLoading = () => {
  return (
    <div className='loading_orders'>
                <ThreeDot variant="pulsate" color="#e1a10b"  size="medium" />
    </div>
  )
}

export default OrdersLoading
