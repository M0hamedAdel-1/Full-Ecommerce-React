import React, { useEffect, useState } from 'react'
import HeadingComponent from './headingcomponent/HeadingComponent'
import CardDashboard from './cardsDashboard/CardDashboard'
import SalesCharts from './saleschart/SalesCharts'
import "./dashboard.css"
import ProductsChart from './productschart/ProductsChart '
import { FiRefreshCw } from 'react-icons/fi'
import { axiosInstance } from '../../config/axios'
import TableComponent from './TableComponent'
import { OrbitProgress } from 'react-loading-indicators'
import toast from 'react-hot-toast'
import OrderDetails from './OrderDetails'
const Dashboard = () => {
  const [analytics,setanalytics] = useState(null)
  const [loading,setloading] = useState(false)
  const [orders,setorders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null);

  

  const headers = [
    {
      label: "#",
      render: (row, i, pageIndex) => (pageIndex - 1) * 10 + i + 1,
    },
    {
      label: "Name",
      render: (row) => `${row.firstName} ${row.secondName}`,
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Total Amount",
      render: (row) => `$${row.totalAmount}`,
    },
    {
      label: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
  label: "Actions",
  render: (order) => (
    <div>
      
      <span
        className="view"
        onClick={() => handleView(order.id)}
      >
        View
      </span>

      <span className={`status ${order.status?.toLowerCase()}`}>
        {order.status}
      </span>

    </div>
  ),
}
  ];
 
 const handleView =(id)=>{
  const selectedOrder = orders.find((o) => o.id === id);
  setSelectedOrder(selectedOrder)
 }

   const getAnalytics = async()=>{
      setloading(true)
        try{  
            const response = await axiosInstance.get("/analytics")
            setanalytics(response.data)
            setorders(response.data.recentOrders)
           

        }catch (e) {
        const message =
          e.response?.data?.error?.message ||
          e.response?.data?.message ||
          e.message ||
          "Something went wrong";
        toast.error(message);
      }finally{
          setloading(false)
        }
    }
  useEffect(()=>{
    getAnalytics()
  },[])
  if(loading){
    return(
      <div className="load_center">
            <OrbitProgress  color="#eaf737" size="medium" />
          </div>
    )
  }
  const click_refresh =()=>{
    getAnalytics()
  }


  return (
    <div className='dashboard_home'>
        <HeadingComponent heading="Analytics" Icon={FiRefreshCw} loading={loading} click_arrow={click_refresh}/>
        {analytics && <CardDashboard metrics = {analytics.metrics} /> }
        <div className='charts'>
          {analytics &&  <SalesCharts salesOverview = {analytics.charts.salesOverview} /> }
         
           {analytics &&  <ProductsChart topProducts = {analytics.charts.topProducts} /> }
          

        </div>
        <div className='table_content'>
           {analytics && <TableComponent headers={headers} rows={analytics.recentOrders} pageIndex={1} /> }
        
        </div>

        <div className='order_details'>
                {selectedOrder && <OrderDetails order={selectedOrder} onclose={()=>setSelectedOrder(null)} />}</div>
    </div>
  )
}

export default Dashboard
