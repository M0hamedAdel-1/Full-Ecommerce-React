import React, { useEffect, useState } from 'react'
import "./categories.css"
import HeadingComponent from '../../headingcomponent/HeadingComponent'
import { Link } from 'react-router-dom'
import SearchComponents from '../../SearchComponents'
import { FiRefreshCw } from 'react-icons/fi'
import { axiosInstance } from '../../../../config/axios'
import toast from 'react-hot-toast'
import { Label } from 'recharts'
import { FaRegEdit } from 'react-icons/fa'
import TableComponent from '../../TableComponent'
import { OrbitProgress } from 'react-loading-indicators'
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md'
import Swal from 'sweetalert2'
const Categories = () => {
const [search,setSearch] = useState()

    const [categories, setcategories] = useState([]);
    const [loading, setloading] = useState(false);
  
    const [pageIndex, ] = useState(1);
  
  const handleDelete = async(id)=>{
    const result = await Swal.fire({
            title: "Are you sure?",
            text: "This category will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            confirmButton: "my-swal-confirm",
            cancelButton: "my-swal-cancel",
          },
          });
          if (!result.isConfirmed) return;
    try{
        const res = await axiosInstance.delete(`/category/delete-category?id=${id}`)

          if (res.status === 200) {
              setcategories(categories.filter((p) => p.id !== id));
              toast.success("Product deleted successfully");
            }
    }catch(e){
            toast.error(e.response?.data?.message || "Delete failed");
    }
  }
const headers = [
  {
    label: "#",
    render: (row, i) => i + 1,
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Description",
    render: (row) => (<div dangerouslySetInnerHTML={{__html:row.description}}/>),
  },
  {
    label: "Actions",
    render: (row) => (
      <div className="action-group">

        <Link to={`edit/${row.id}`}
          className="action-btn edit-btn"
          title="Edit"
        >
          <MdOutlineModeEditOutline />
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



   useEffect(() => {
    const getCategory = async () => {
      try {
        setloading(true);
        const response = await axiosInstance.get(`/category/get-all-categories`);
        setcategories(response.data);
      } catch (e) {
        const message =
          e.response?.data?.error?.message ||
          e.response?.data?.message ||
          e.message ||
          "Something went wrong";
        toast.error(message);
      } finally {
        setloading(false);
      }
    };

    getCategory();
  }, []);

  const filteredcategories = categories.filter((p) =>
  p.name.toLowerCase().includes(search?.toLowerCase() || "")
);
  return (
    <div className='dashboard_categories'>
      <HeadingComponent heading="categories"/>
      <Link className='add_category' to="addCategory">add category</Link>
      <div>
        <SearchComponents value={search} onChange={(e)=>setSearch(e.target.value)} />

        
      </div>
      <div>
        {loading ? (
          <div className="load_center">
            <OrbitProgress color="#eaf737" size="medium" text="" textColor="" />
          </div>
        ) : (
          <div className="table_content">
            <TableComponent
              headers={headers}
              rows={search ? filteredcategories : categories}
              pageIndex={pageIndex}
            />
          </div>
        )}
      </div>


    </div>
  )
}

export default Categories
