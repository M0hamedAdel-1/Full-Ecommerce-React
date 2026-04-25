import { FiClock, FiDollarSign } from 'react-icons/fi';
import "./order.css"
const Order = ({order}) => {

const date = new Date(order.createdAt);

  return (
     <div  className="order-card">
      {/* Header */}
      <div className="order-header">
        <div className="order-date">
          <FiClock className="icon" />
          <span>{date.toLocaleString()}</span>
        </div>
        <div className="order-total">
          <FiDollarSign className="icon" />
          <span>Total: ${order.totalAmount}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className='cards'>
      {order.items.map((item)=>(
        <div key={item.id} className="product-card">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="product-image"
          />
        <div className="product-details">
          <h3 className="product-name">{item.name}</h3>
          <p className="product-quantity">
            Quantity: {item.quantity} × ${item.price}
          </p>
          <div className="product-variants">
            <span className="color-name">{item.color}</span>
            <span className="divider">|</span>
            <span className="size">Size: {item.size}</span>
          </div>
        </div>
      </div>
      ))}
      </div>
      {/* Footer */}
      <div className="order-footer">
        <div className="order-id">
          <span className="id-label">ID: </span>
          <span className="id-value">{order.id}</span>
        </div>
        <span className={`status-badge ${order.status}`}>
          {order.status}
        </span>
      </div>
    </div>
  )
}

export default Order
