
const OrderDetails = ({order, onclose}) => {
  if (!order) return null;
  return (
    <div className={`modal_overlay `}  >
      <div className="modal_box" onClick={(e) => e.stopPropagation()}>
        
        {/* Close */}
        <button className="close_btn" onClick={onclose} 
          >✕</button>

        <h2 className="modal_title">Order Details</h2>

        {/* Header */}
        <div className="order_header">
          <div className="box-one">
            <span>Order ID</span>
            <h4>{order.id}</h4>
          </div>

          <div className="box-two">
            <span>Order Date</span>
            <h4>{order.createdAt}</h4>
          </div>
        </div>

        {/* Customer */}
        <div className="section">
          <h3>Customer Information</h3>

          <div className="info_grid">
            <div>
              <span>Full Name</span>
              <p>{order.firstName}  {order.secondName}</p>
            </div>

            <div>
              <span>Phone</span>
              <p>{order.phone}</p>
            </div>

            <div>
              <span>Email</span>
              <p>{order.email}</p>
            </div>

            <div>
              <span>Address</span>
              <p>{order.address}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="section">
          <h3>Order Items</h3>

          {order.items.map((item, i) => (
            <div className="item_card" key={i}>
              <div className="item_left">
                <img src={item.imageUrl} alt="" />

                <div className="info_card">
                  <h4>{item.name}</h4>
                  <p className="quantity">Quantity: {item.quantity}</p>

                  <div className="meta">
                    <span className="color_dot" style={{ background: item.color }}></span>
                    <span>{item.colorName}</span>
                    <span>| Size: {item.size}</span>
                  </div>
                </div>
              </div>

              <div className="item_price">
                <h4>${item.price}</h4>
                <p>Total: ${order.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
export default OrderDetails