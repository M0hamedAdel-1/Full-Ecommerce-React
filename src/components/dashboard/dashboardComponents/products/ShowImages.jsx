import React, { useEffect, useState } from 'react'
import HeadingComponent from '../../headingcomponent/HeadingComponent'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../../../config/axios'
import { MdDelete } from 'react-icons/md';
import Swal from "sweetalert2";
import { OrbitProgress } from 'react-loading-indicators'
import TableComponent from '../../TableComponent'
const ShowImages = () => {
     const [loading,setloading] = useState(false)
    const [products,setproducts] = useState([])
    const {id} = useParams()
      const navigate = useNavigate()
    const clickarrow =()=>{
        navigate("/admin/products")
    }
    const headers = [
      {
        label: "#",
        key: "index",
      },
      {
        label: "Image",
        key: "image",
        render: (row) => (
          <img
          src={row.image}
          className="shoe-image"
          alt="product"
          />
        ),
      },
      {
        label: "Actions",
        key: "actions",
        render: (row) => (
          <button
          className="delete-button"
          onClick={() => handleDelete(row.id,row.image)}
          >
            <MdDelete />
          </button>
        ),
      },
    ]
    const selectedproduct = products.find((item)=>(item.id === id))
    const rows =
    products
      .find((p) => p.id === id)
      ?.productImages?.map((img, index) => ({
        index: index + 1,
        image: img.imageUrl,
        id: img.id,
      })) || [];
   
  
      
    
    const handleDelete = async (imageId, imageUrl) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "This image will be deleted permanently!",
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
      try {
        await axiosInstance.delete(
          `/productImage/delete-image?id=${imageId}&imageUrl=${imageUrl}`
          
        );
    
        toast.success("Image deleted");
    
        setproducts((prev) =>
          prev.map((product) =>
            product.id === id
              ? {
                  ...product,
                  productImages: product.productImages.filter(
                    (img) => img.id !== imageId
                  ),
                }
              : product
          )
        );
      } catch (e) {
        toast.error(e.message);
      }
    };

     useEffect(() => {
    const getProducts = async () => {
      try {
        setloading(true);
        const response = await axiosInstance.get(
          `/product/get-all-products?pageSize=1000&pageIndex=1`,
        );
        setproducts(response.data.data)
        
      } catch (e) {
        toast.error(e.message);
      } finally {
        setloading(false);
      }
    };
    getProducts();
  }, []);
    const handledeletAllimages =  async()=>{

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This image will be deleted permanently!",
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
        await axiosInstance.delete(`/productImage/delete-all-images?id=${id}`)
        toast.success("all images deleted")
        setproducts((prev)=> prev.map((product)=>(
          product.id === id?
          ({
            ...product,
            productImages:[]
          }):product
        )))
      }catch(e){
        toast.error(e.message ||"images not removed")
      }
    }

     if(loading){
        return <div className="load_center">
                <OrbitProgress color="#eaf737" size="medium" text="" textColor="" />
              </div>
      }
  return (
    <div >
      <HeadingComponent heading="product images" Icon={FaArrowRightLong } click_arrow={clickarrow}/>
        <div className='show_images'>
                <div className='btns'>
                    <Link to={`/admin/products/images/${id}/add`}>add images</Link>
                    <button onClick={handledeletAllimages}>delete all images</button>
                </div>

                    <div className="shoe-table-container">

                    {!selectedproduct?.productImages?.length ? (
                      <h2 className='no_images_here'>No images here</h2>
                    ) : (
                      <TableComponent headers={headers} rows={rows} />
                    )}

                  </div>
        </div>
    </div>
  )
}

export default ShowImages
