import React, { useRef, useState } from 'react'
import HeadingComponent from '../../headingcomponent/HeadingComponent'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { PiXDuotone } from 'react-icons/pi'
import { axiosInstance } from '../../../../config/axios'
import toast from 'react-hot-toast'

const AddNewImages = () => {
    const {id} = useParams()
    const [images,setimages] = useState([])
    const [loading,setloading] = useState(false)
    const navigate = useNavigate()
    const clickarrow =()=>{
        navigate(-1)
    }

    const fileInputRef = useRef(null);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
        const imagespreview = files.map((file)=>({
                file: file,
                url: URL.createObjectURL(file),
        }))
          setimages((prev) => [...prev, ...imagespreview]);
  };
  const handleDeleteImage = (index) => {
  setimages((prev) => prev.filter((_, i) => i !== index));
};

const handleUpload = async () => {
    if (images.length === 0) {
        toast.error("please select image");
        return; 
    }
    setloading(true)
  try {
    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    formData.append("productId", id);
      await axiosInstance.post("/productImage/add-many-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    toast.success("Images uploaded successfully");
    setimages([]);
  } catch (e) {
    toast.error(e.message || "Upload failed");
  }finally{
    setloading(false)
  }
};
  return (
    <div >
      <HeadingComponent heading="Add Product Images" Icon={FaArrowRightLong } click_arrow={clickarrow} />
            <div className='add_new_images'>
                    <div className="upload-input-wrapper">
                    <button 
                        type="button"
                        className="upload-box"
                        onClick={handleBoxClick}
                    >
                        <span className="upload-plus">+</span>
                    </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="upload-input-hidden"
                    multiple={true}
                />
                    </div>

                    <div className="preview_container">
                        
                        {images.map((img, index ) => (
                            <div className='image_container' key={index}>
                                <div className='delete_icon' onClick={()=>handleDeleteImage(index)}  >
                                    <PiXDuotone   />
                                </div>
                            <img
                            src={img.url}
                            alt="preview"
                            className="preview_img"
                            />
                            </div>
                        ))}
                    </div>
            <button disabled={loading} className='add_image_btn' onClick={handleUpload}>add image</button>
            </div>
    </div>
  )
}

export default AddNewImages
