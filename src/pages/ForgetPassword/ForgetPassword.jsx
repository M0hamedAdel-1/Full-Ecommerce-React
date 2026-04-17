import React, { useState } from 'react'
import "./forgetPassword.css"
import { axiosInstance } from '../../config/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const ForgetPassword = () => {

    const [email,setemail] = useState("")
    const [loading,setIsloading] = useState(false)
    const navigate = useNavigate()
    const handlesubmit = async(e)=>{

        e.preventDefault()
        if(!email){
            toast.error("please enter you email")
            return;
        }
        
        try{
            setIsloading(true)
            const {data} = await axiosInstance.post( `/account/forgotPassword?email=${email}`)
            navigate(`/verify-otp?email=${email}`);
            toast.success(data.message)

    }catch(e){

            toast.error(e.response?.data?.message,"invalid email")
            
        }finally{
            setIsloading(false)
        }
}
  return (
    <div className='forget_password'>
        <img className='one' src='../../../imgs/pill-shape.png'/>

    <div className='container'>
        <div className='all_content'></div>
        <form onSubmit={handlesubmit} className='form'>
            <div className='content'>
                    <h2>Forget Password</h2>
                    <p>Enter you email to recover password</p>
                    <div className='input_group'>
                        <label htmlFor='email' >email</label>
                    <input onChange={(e)=>setemail(e.target.value)} id='email'  type='email' placeholder='your email'/>
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

export default ForgetPassword
