import "./cardsdashboard.css"
import { FiDollarSign, FiShoppingCart, FiBox, FiUsers } from "react-icons/fi";

const CardDashboard = ({metrics}) => {
  
    const cards = [
  { title: "Revenue", value:metrics.totalRevenue, icon: <FiDollarSign /> },
  { title: "Orders",value: metrics.totalOrders, icon: <FiShoppingCart /> },
  { title: "Products", value:metrics.totalProducts, icon: <FiBox /> },
  { title: "Customers", value: metrics.totalCustomers , icon: <FiUsers /> },
];
  return (
    <>
        <div className="cards_dashboard">
      {cards.map((card, i) => (
        <div className="card" key={i}>
          <div className={`icon ${card.title} `}>{card.icon}</div>
          <div>
            <h3>{card.title}</h3>
            <h1>{card.value}</h1>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default CardDashboard
