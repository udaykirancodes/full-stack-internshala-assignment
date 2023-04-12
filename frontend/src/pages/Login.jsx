import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./auth.css";
import { ToastContainer } from 'react-toastify';
import { successToast, dangerToast } from '../components/Toast';
import { loginurl } from '../urls';
export default function Login() {
    const [eye, setEye] = useState(false);
    const [error, setError] = useState('');
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    // handle Input
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const OpenEye = () => {
        setEye(true);
    }
    const CloseEye = () => {
        setEye(false);
    }
    function ValidateEmail(input) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex)) {
            return true;
        }
        return false;
    }
    const login = async () => {
        if (!ValidateEmail(input.email)) {
            dangerToast("Enter Valid Email");
            return;
        }
        if (!input.email || !input.password) {
            dangerToast("Email & Password Required");
            return;
        }
        let { data } = await axios.post(loginurl, input, { validateStatus: false });
        if (!data.success) {
            dangerToast(data.msg);
        }
        else {
            const token = data.authToken;
            localStorage.setItem('token', token);
            navigate('/');
        }
    }
    const navigate = useNavigate();
    return (
        <>
            <div className="container">
                <ToastContainer />
                <div className="login-area">
                    <div className="loginMain">
                        <div className="loginLeft">
                            <h3 className="logo">Login</h3>
                            {
                                error ?
                                    <p className="error">{error}</p>
                                    :
                                    <p className="description">Welcome to <span className="login-logo-text">UdayCodes </span>by <span className="login-logo-text">UdayKiran</span></p>
                            }
                            <div className="input_area">
                                <div className="input_box">
                                    <label className="label">Email <span className="required">*</span></label>
                                    <div className="input_container">
                                        <input type="email" name="email" autoComplete="false" value={input.email} onChange={(e) => handleInput(e)} className="input login-input" placeholder="example@gmail.com" required={true} />
                                    </div>
                                </div>
                                <div className="input_box">
                                    <label className="label">Password <span className="required">*</span></label>
                                    <div className="input_container password-eye">
                                        {
                                            eye ?
                                                <i onClick={CloseEye} className="eye uil uil-eye"></i> :
                                                <i onClick={OpenEye} className="eye uil uil-eye-slash"></i>
                                        }
                                        <input type={eye ? "text" : "password"} name="password" placeholder="password" value={input.password} onChange={(e) => handleInput(e)} className="input login-input" required />
                                    </div>
                                </div>
                            </div>
                            <div className="login-links">
                                <p className="forgot-link">
                                    {/* <Link to="/forgot-password"> Forgot Password ?</Link> */}
                                </p>
                            </div>
                            <div className="button-container">
                                <button className="btn btn-2" onClick={() => navigate("/register")}>Register</button>
                                <button onClick={(e) => login(e)} type="submit" className="btn btn-large">{"Login"}</button>
                            </div>
                            <div className="or-text-box">
                                <div className="line"></div>
                                <p className="or-text">or</p>
                                <div className="line"></div>
                            </div>
                            <div className="social-container">
                                <Link to="/loginotp">
                                    <button className="social-button btn">Login with Email OTP</button>
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
