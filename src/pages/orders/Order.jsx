import React from 'react'
import { FiClock, FiDollarSign } from 'react-icons/fi';
import "./order.css"
const Order = () => {
     const defaultOrder = {
    date: '04 Apr, 2026 - 11:50 AM',
    total: 500,
    product: {
      name: 'Awesome Shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150',
      quantity: 1,
      price: 500,
      color: 'Red',
      colorCode: '#ef4444',
      size: 35
    },
    orderId: '69d0ded255c0475bd9566606',
    status: 'completed'
  };
   const data = defaultOrder;

    const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-completed';
    }
  };
  return (
     <div className="order-card">
      {/* Header */}
      <div className="order-header">
        <div className="order-date">
          <FiClock className="icon" />
          <span>{data.date}</span>
        </div>
        <div className="order-total">
          <FiDollarSign className="icon" />
          <span>Total: ${data.total}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card">
        <img 
          src={data.product.image} 
          alt={data.product.name}
          className="product-image"
        />
        <div className="product-details">
          <h3 className="product-name">{data.product.name}</h3>
          <p className="product-quantity">
            Quantity: {data.product.quantity} × ${data.product.price}
          </p>
          <div className="product-variants">
            <span 
              className="color-dot" 
              style={{ backgroundColor: data.product.colorCode }}
            ></span>
            <span className="color-name">{data.product.color}</span>
            <span className="divider">|</span>
            <span className="size">Size: {data.product.size}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="order-footer">
        <div className="order-id">
          <span className="id-label">ID: </span>
          <span className="id-value">{data.orderId}</span>
        </div>
        <span className={`status-badge ${getStatusClass(data.status)}`}>
          {data.status}
        </span>
      </div>
    </div>
  )
}

export default Order
