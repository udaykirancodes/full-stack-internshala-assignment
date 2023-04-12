import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./auth.css";
import { ToastContainer } from 'react-toastify';
import { successToast, dangerToast } from '../components/Toast';
import { registergetotp } from '../urls';
export default function RegisterOtp() {
    const [email, setEmail] = useState('');
    // function to validate email
    function ValidateEmail(input) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex)) {
            return true;
        }
        return false;
    }
    const navigate = useNavigate();
    const getOTP = async () => {
        if (!ValidateEmail(email)) {
            dangerToast("Enter Valid Email");
            return;
        }
        console.log(email);
        // backend call
        let { data } = await axios.post(registergetotp, { email: email }, { validateStatus: false });
        if (!data.success) {
            dangerToast(data.msg);
        }
        else {
            localStorage.setItem('email', email);
            navigate('/validateregister');
        }
    }
    return (
        <>
            <div className="container">
                <ToastContainer />
                <div className="login-area">
                    <div className="loginMain">
                        <div className="loginLeft">
                            <h3 className="logo">Register With OTP</h3>
                            {
                                <p className="description">Welcome to <span className="login-logo-text">UdayCodes </span>by <span className="login-logo-text">UdayKiran</span></p>
                            }
                            <div className="input_area">
                                <div className="input_box">
                                    <label className="label">Email <span className="required">*</span></label>
                                    <div className="input_container">
                                        <input type="email" name="email" autoComplete="false" value={email} onChange={(e) => setEmail(e.target.value)} className="input login-input" placeholder="example@gmail.com" required={true} />
                                    </div>
                                </div>
                            </div>
                            <div className="button-container">
                                <button className="btn btn-2" onClick={() => navigate("/login")}>Login</button>
                                <button onClick={(e) => getOTP(e)} type="submit" className="btn btn-large">{"Get OTP"}</button>
                            </div>
                            <div className="or-text-box">
                                <div className="line"></div>
                                <p className="or-text">or</p>
                                <div className="line"></div>
                            </div>
                            <div className="social-container">
                                <Link to="/login">
                                    <button className="social-button btn">Login With Email & Password</button>
                                </Link>
                            </div>
                        </div>
                        <div className="loginRight">
                            <img src="./story-1.jpg" className="login_img" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
