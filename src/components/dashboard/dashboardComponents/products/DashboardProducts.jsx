import HeadingComponent from '../../headingcomponent/HeadingComponent'
import SearchComponents from '../../SearchComponents'
import { Link, Outlet } from 'react-router-dom'
import "./dashboardproducts.css"
import TableComponent from '../../TableComponent'
import Pagination from '../../Pagination '
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../../../config/axios'
import { useNavigate } from "react-router-dom";

import toast from 'react-hot-toast'
import { FaEye } from 'react-icons/fa6'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { OrbitProgress } from 'react-loading-indicators'

const DashboardProducts = () => {
      const navigate = useNavigate()
  const [pageIndex, setPageIndex] = useState(1);
  const [allpages, setallpages] = useState();
  const [productarr, setProductarr] = useState([]);

  const handleView = (id) => {
    
    navigate(`images/${id}`)
  };

  const headers = [
  {
    label: "#",
    render: (row, i) => i + 1,
  },
  {
    label: "Image",
    render: (row) => (
      <img
        src={row.imageUrl}
        alt="product"
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    ),
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Category",
    key: "category",
  },
  {
    label: "Price",
    render: (row) => `$${row.price}`,
  },
  {
    label: "Discount",
    render: (row) =>
      row.hasDiscount ? `${row.priceBeforeDiscount - row.price}` : "-",
  },
  {
  label: "Actions",
  render: (row) => (
    <div className="btns">
      
      <button
        className="action-btn view-btn"
        onClick={() => handleView(row.id)}
        title="View"
      >
        <FaEye />
      </button>

      <Link to={`edit-product/${row.id}`}
        className="action-btn edit-btn"
        title="Edit"
      >
        <FaRegEdit />
      </Link>

      <button
        className="action-btn delete-btn"
        onClick={() => handleDelete(row.id)}
        title="Delete"
      >
        <MdDelete />
      </button>

    </div>
  ),
},
];


  const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/product/get-all-products?pageIndex=${pageIndex}&pageSize=12`,
        );

        setProductarr(response.data.data);
        setallpages(response.data.totalPages);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [pageIndex]);
  
  const handleDelete = async(id)=>{
    try{
        const res = await axiosInstance.delete(`/product/delete-product?id=${id}`)

          if (res.status === 200) {
              setProductarr(productarr.filter((p) => p.id !== id));
              toast.success("Product deleted successfully");
            }
    }catch(e){
            toast.error(e.response?.data?.message || "Delete failed");
    }
  }
  
  
  return (
    <>

    <div className='dashboard_products'>

      <HeadingComponent heading="products"/>
      <Link className='add_new_product' to="add">add to product</Link>
      <div>
      <SearchComponents/>
      </div>
      <div>
        {isLoading?(
          <div className="load_center">
            <OrbitProgress color="#eaf737" size="medium" text="" textColor="" />
          </div>
        ):(
          <>
            <div className='table_content'>


          <TableComponent headers={headers} rows={productarr} pageIndex={pageIndex} />
          <Pagination pageIndex={pageIndex} totalPages={allpages} setPageIndex={setPageIndex}/>
        </div>
          </>
        )}
        
      </div>
    </div>
    </>
  )
}

export default DashboardProducts
