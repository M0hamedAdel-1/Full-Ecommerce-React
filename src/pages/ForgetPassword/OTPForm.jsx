import  { useState } from 'react'
import "./forgetPassword.css"
import toast from 'react-hot-toast'
import { axiosInstance } from '../../config/axios'
import { useNavigate, useSearchParams } from "react-router-dom";
const OTPForm = () => {
  const [formdata,setformdata] = useState({otp:"",newPassword:"",confirmedNewPassword:""})

  const [loading,setIsloading] = useState(false)
 const navigate = useNavigate()

const [searchParams] = useSearchParams();
const email = searchParams.get("email");


  const handlesubmit = async (e)=>{
    e.preventDefault()
    const {otp,newPassword,confirmedNewPassword} = formdata;
    
    if(!otp || !newPassword || !confirmedNewPassword){
        toast.error("please fill form")
        return
    } 
    if(newPassword.length <8 || confirmedNewPassword.length <8){
            toast.error("password should be 8 charter at least");
              return;

    }
    if(newPassword !== confirmedNewPassword){
          toast.error("New password not match confirm password")
            return;


    }
    try{
      
      
      setIsloading(true)
      const response = await axiosInstance.post(`/account/resetPassword`,{
        otp:otp.trim(),
        newPassword:newPassword,
        confirmedNewPassword:confirmedNewPassword,
        email:email

      })
      if (response.status === 200) {
        
        toast.success(" password updated Successfully", );
        navigate("/signin")
      

    }
  }catch (e) {
            toast.error(e.response?.data?.message || "Something went wrong");
          }finally {
      setIsloading(false);
    }
  }
  return (
    <div className='reset_password'>
        <img className='one' src='../../../imgs/pill-shape.png'/>

    <div className='container'>
        <div className='all_content'></div>
        <form onSubmit={handlesubmit} className='form'>
            <div className='content'>
                    <h2>Reset Password</h2>
                    <p>Enter the otp code and the new password</p>
                    <div className='input_group'>
                        <label htmlFor='otp-code' >otp code</label>
                    <input onChange={(e)=>setformdata({...formdata,otp:e.target.value})}  id='otp-code'  type='text'placeholder='otp code'/>
                    </div>
                    <div className='input_group'>
                        <label htmlFor='password' >password</label>
                    <input  onChange={(e)=>setformdata({...formdata,newPassword:e.target.value})} id='password'  type='password' placeholder='your password'/>
                    </div>
                    <div className='input_group'>
                        <label htmlFor='new-password' >new password</label>
                    <input  onChange={(e)=>setformdata({...formdata,confirmedNewPassword:e.target.value})} id='new-password'  type='password' placeholder='your new password'/>
                    </div>
                    <button disabled={loading} type='submit'>submit</button>
            </div>
        </form>
        <div className='image'>
            <img src='../../../imgs/forget-password.png'/>
        </div>
    </div>
    </div>
  )
}

export default OTPForm
