import React from 'react'
import "./contact.css"
import { IoCall } from 'react-icons/io5'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'
const Contact = () => {
  return (
    <div className='contact'>
      <img className='top' src='../../../public/imgs/square.svg'/>
      <img className='bottom' src='../../../public/imgs/square.svg'/>


      <div className='container'>
        <h1>Contact Us</h1>
          <div className='contact_form'>
            <div className='icons'>
                 <a href='https://www.facebook.com/share/1Gi3gk6z5u/' target='_blank'><FaFacebookF/></a>
              
                 <a href=''><IoCall/></a>
                   <a href='https://www.linkedin.com/in/mohamed-adel-4b6752259?utm_source=share_via&utm_content=profile&utm_medium=member_android' target='_blank'><FaLinkedinIn/></a>
                  <a href='https://github.com/M0hamedAdel-1' target='_blank'><FaGithub/></a>
          </div>
          <div className='form'>
              <input type='text' placeholder='full name'/>
              <input type='email' placeholder='email'/>
              <textarea placeholder="message"/>
              <button type='submit'>send</button>
          </div>
          </div>
      </div>

    </div>
  )
}

export default Contact
 
