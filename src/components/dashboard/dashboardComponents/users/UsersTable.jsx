import React, { useEffect, useState } from 'react';
import './users.css';
import { axiosInstance } from '../../../../config/axios';
import toast from 'react-hot-toast';
import { OrbitProgress } from 'react-loading-indicators';

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;
useEffect(() => {
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
    getusers();
  }, []);  
  // useEffect(() => {
  //   const getusers = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axiosInstance.get(
  //         `/get-users`,
  //       );

  //       setusersarr(response.data.users);
        
  //     } catch (e) {
  //       toast.error(e.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getusers();
  // }, []);  

  if (isLoading)
    return (
      <div className="load_center">
        <OrbitProgress color="#eaf737" size="medium" text="" textColor="" />
      </div>
    );
    console.log(users)

  return (
    <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th className="col-index">#</th>
              <th className="col-image">Image</th>
              <th className="col-name">Name</th>
              <th className="col-email">Email</th>
              <th className="col-phone">Phone</th>
              <th className="col-address">Address</th>
              <th className="col-created">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="col-index">{index + 1}</td>
                <td className="col-image">
                      <img src={user.image} alt={user.name} className="user-image" />
                </td>
                <td className="col-name">{user.name}</td>
                <td className="col-email">{user.email}</td>
                <td className="col-phone">{user.phone}</td>
                <td className="col-address">{user.address}</td>
                <td className="col-created">{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Pagination */}
      <div className="pagination">
        <button 
          className="pagination-btn" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span className="page-info">{currentPage} of {totalPages}</span>
        <button 
          className="pagination-btn" 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersTable;