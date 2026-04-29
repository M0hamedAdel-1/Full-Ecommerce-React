import React, { useEffect, useState } from 'react'
import "./users.css"
import HeadingComponent from '../../headingcomponent/HeadingComponent'
import SearchComponents from '../../SearchComponents'
import { FiRefreshCw } from 'react-icons/fi'
import TableComponent from '../../TableComponent'
import { axiosInstance } from '../../../../config/axios'
import toast from 'react-hot-toast'
import { OrbitProgress } from 'react-loading-indicators'
import Pagination from '../../Pagination '
const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search,setSearch] = useState("")
    const [users, setusersarr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const headers = [
  {
    label: "#",
    render: (row, i) => i + 1,
  },
  {
    label: "Image",
    render: (row) => (
      <img
        src={row.image}
        alt={row.name}
        className="user-image"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
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
    label: "Phone",
    key: "phone",
  },
  {
    label: "Address",
    key: "address",
  },
  {
    label: "Created At",
    render: (row) =>
      new Date(row.createdAt).toLocaleString(),
  },
];

const getusers = async () => {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get(
            `/get-users`,
          );
  
          setusersarr(response.data.users);
          
        } catch (e) {
          toast.error(e.message);
        } finally {
          setIsLoading(false);
        }
      };
  useEffect(() => {
      
      getusers();
    }, []);  
    const click_refresh =()=>{
      getusers()


    }

    
    
    const keyboard = (search || "").toLowerCase()
    const filteredusers = users.filter((u)=>
    `${u.firstName || ""} ${u.secondName || ""} ${u.email || ""} ${u.phone || ""} ${new Date (u.createdAt).toLocaleString}`
    .toLowerCase().includes(keyboard)
  )
  return (
   <div className="dashboard_orders">
      <HeadingComponent heading="users" Icon={FiRefreshCw} click_arrow={click_refresh} loading={isLoading} />
      <div>
        <SearchComponents value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div>
        {isLoading ? (
          <div className="load_center">
            <OrbitProgress color="#eaf737" size="medium" />
          </div>
        ) : (
          <div className="table_content">
            <TableComponent
              headers={headers}
              rows={search?filteredusers:users}
              pageIndex={currentPage}
            />
            <Pagination pageIndex={currentPage}
              totalPages={1}
              setPageIndex={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
