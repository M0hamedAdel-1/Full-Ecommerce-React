import { FaFacebookF } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">

        <div className="content" data-aos="fade-up">
          <h3>
            kiosk <span>kids</span>
          </h3>
          <p>
            Platform for Shoes that keep kids feet comfortable all day long.
          </p>
        </div>

        <div className="mail" data-aos="fade-up">
          <h3 className="one">Mail us at:</h3>
          <p className="two">kidsKiosk@contact.com</p>
        </div>

        <div className="follow_us" data-aos="fade-up">
          <h3 className="one">Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/1Gi3gk6z5u/" target="_blank">
            <FaFacebookF />
          </a>
          <a href="">
            <IoCall />
          </a>
          <a
            href="https://www.linkedin.com/in/mohamed-adel-4b6752259?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/M0hamedAdel-1" target="_blank">
            <FaGithub />
          </a>
          </div>

          
        </div>
      </div>
      <p className="rights" >@2024 Kids Kiosk. All rights reserved</p>
    </div>
  );
};

export default Footer;
