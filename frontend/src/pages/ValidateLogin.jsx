import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./auth.css";
import { ToastContainer } from 'react-toastify';
import { successToast, dangerToast } from '../components/Toast';
import { loginurl, validateloginotp } from '../urls';
export default function LoginOtp() {
    const [otp, setOtp] = useState('');
    // function to validate email
    function ValidateEmail(input) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex)) {
            return true;
        }
        return false;
    }
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        let mail = localStorage.getItem('email');
        if (!mail) {
            navigate('/loginotp');
        }
        else {
            setEmail(mail);
        }
    }, [])
    const validateOTP = async () => {
        // backend call to api
        let { data } = await axios.post(validateloginotp, { email: email, otp: otp }, { validateStatus: false });
        if (!data.success) {
            dangerToast(data.msg);
        }
        else {
            let token = data.authToken;
            localStorage.removeItem('email');
            localStorage.setItem('token', token);
            navigate('/');
        }
    }
    return (
        <>
            <div className="container">
                <ToastContainer />
                <div className="login-area">
                    <div className="loginMain">
                        <div className="loginLeft">
                            <h3 className="logo">OTP Validation</h3>
                            {
                                <p className="description">Welcome to <span className="login-logo-text">UdayCodes </span>by <span className="login-logo-text">UdayKiran</span></p>
                            }
                            <div className="input_area">
                                <div className="input_box">
                                    <label className="label">Enter OTP <span className="required">*</span></label>
                                    <div className="input_container">
                                        <input type="number" name="otp" autoComplete="false" value={otp} onChange={(e) => setOtp(e.target.value)} className="input login-input" required={true} />
                                    </div>
                                </div>
                            </div>
                            <div className="button-container">
                                <button className="btn btn-2" onClick={() => navigate("/register")}>Register</button>
                                <button onClick={validateOTP} type="button" className="btn btn-large">{"Validate OTP"}</button>
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
