import React, { useState } from 'react'
import "./contact.css"
import { IoCall } from 'react-icons/io5'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { axiosInstance } from '../../config/axios'
import toast from 'react-hot-toast'
const Contact = () => {
  const [loading,setloading] = useState(false)
const [contactForm,setcontanctForm] = useState({fullName:"",email:"",message:""})

const handlesubmit = async(e)=>{
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  e.preventDefault()
  
  const {fullName,email,message} = contactForm;
  
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("email", email);
  formData.append("message", message);
   if(!fullName || !email || !message){
      toast.error("please fill all fields");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("enter valid email");

      return;
    }
    if(message.length <20){
      toast.error("message must be greater than 20 charter")
      return
    }
  try{
    setloading(true)

     const response = await axiosInstance.post("/contact", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    if(response.status === 200){
      setcontanctForm({
        fullName: "",
        email: "",
        message: "",
      });
      toast.success("Successfully sended form")
    }

  }catch (error) {
  toast.error(error.response?.data?.message || "Server Error");
} finally {
    setloading(false);
  }

}


  return (
    <div className='contact'>
      <img className='top' src='../../../imgs/square.svg'/>
      <img className='bottom' src='../../../imgs/square.svg'/>


      <div className='container'>
        <h1>Contact Us</h1>
          <div  className='contact_form'>
            <div className='icons'>
                 <a href='https://www.facebook.com/share/1Gi3gk6z5u/' target='_blank'><FaFacebookF/></a>
              
                 <a href=''><IoCall/></a>
                   <a href='https://www.linkedin.com/in/mohamed-adel-4b6752259?utm_source=share_via&utm_content=profile&utm_medium=member_android' target='_blank'><FaLinkedinIn/></a>
                  <a href='https://github.com/M0hamedAdel-1' target='_blank'><FaGithub/></a>
          </div>
          <form onSubmit={handlesubmit} className='form'>
              <input
                onChange={(e)=>setcontanctForm({...contactForm,fullName:e.target.value})}
                value={contactForm.fullName}
                type='text' placeholder='full name'
                />
              <input
                onChange={(e)=>setcontanctForm({...contactForm,email:e.target.value})}
                value={contactForm.email}
                type='email'
                placeholder='email'
                  />
              <textarea
              onChange={(e)=>setcontanctForm({...contactForm,message:e.target.value})}
              value={contactForm.message}
               placeholder="message"/>
              <button  disabled={loading} type='submit'>send</button>
          </form>
          </div>
      </div>

    </div>
  )
}

export default Contact
 
