import React from "react";
import "./verification.css"
import OtbInputs from "./OtbInputs";

const Verification = () => {
  return<>
    <div className="verification_page">
        <img className="one" src="../../../imgs/square.svg"/>
        <img className="two" src="../../../imgs/square.svg"/>
        <div className="container">
                <div className="verify_content">
                                <div className="heading">
                                <span>kiosk</span>
                                <span>kids</span>
                            </div>
                            <img src="../../../public/imgs/verify.png"/>
                            <p className="one-p">Enter 6 digits code that you have received on email before expiration</p>
                            <OtbInputs/>
                            
                            
                </div>
        </div>
    </div>


  </>;
};

export default Verification;
