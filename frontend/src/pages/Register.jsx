import React, { useState, useEffect } from 'react'
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import { registerurl } from '../urls';
import { dangerToast } from '../components/Toast';
export default function Register() {
    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);
    const [error, setError] = useState('')
    const [input, setInput] = useState({
        email: "",
        password: "",
        contact: "",
        name: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();
    // handle Input
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(input);
    }
    const OpenEye1 = () => {
        setEye1(true);
    }
    const CloseEye1 = () => {
        setEye1(false);
    }
    const OpenEye2 = () => {
        setEye2(true);
    }
    const CloseEye2 = () => {
        setEye2(false);
    }
    function clearAll() {
        setTimeout(() => {
            setError('');
        }, 3000);
    }
    function ValidateEmail(input) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex)) {
            return true;
        }
        return false;
    }

    const register = async () => {
        // validation
        if (input.password !== input.confirmPassword) {
            dangerToast("Password Mismatch");
            return;
        }
        if (!input.email || !input.password || !input.name || !input.confirmPassword) {
            dangerToast("All Fields are required");
            return;
        }
        if (!ValidateEmail(input.email)) {
            dangerToast("Enter Valid Email");
            return;
        }
        let { data } = await axios.post(registerurl, input, { validateStatus: false });
        if (!data.success) {
            dangerToast(data.msg);
        }
        else {
            const token = data.authToken;
            localStorage.setItem('token', token);
            navigate('/');
        }
    }
    return (
        <>
            <div className="container">
                <div className="login-area">
                    <ToastContainer />
                    <div className="loginMain">
                        <div className="loginLeft">
                            <h3 className="logo">Register</h3>
                            {
                                error ?
                                    <p className="error">{error}</p>
                                    :
                                    <p className="description">Welcome to <span className="login-logo-text">UdayCodes </span>by <span className="login-logo-text">UdayKiran</span></p>
                            }
                            <div className="input_area register-area">
                                <div className="input_box">
                                    <label className="label">Email <span className="required">*</span></label>
                                    <div className="input_container">
                                        <input type="email" name="email" value={input.email} onChange={(e) => handleInput(e)} className="input login-input" placeholder="example@gmail.com" required />
                                    </div>
                                </div>
                                <div className="input_box"></div>
                                <div className="input_box">
                                    <label className="label">Full Name<span className="required">*</span></label>
                                    <div className="input_container">
                                        <input type="text" className="input login-input" name="name" onChange={(e) => handleInput(e)} placeholder="Udaykiran Bandarugalla" required />
                                    </div>
                                </div>
                                <div className="input_box">
                                    <label className="label">Contact <span className="required">*</span></label>
                                    <div className="input_container password-eye">
                                        <input type="number" className="input login-input" placeholder="contact" name="contact" onChange={(e) => handleInput(e)} required />
                                    </div>
                                </div>
                                <div className="input_box">
                                    <label className="label">Password <span className="required">*</span></label>
                                    <div className="input_container password-eye">
                                        {
                                            eye1 ? <i onClick={CloseEye1} className="eye uil uil-eye"></i> :
                                                <i onClick={OpenEye1} className="eye uil uil-eye-slash"></i>
                                        }
                                        <input type={eye1 ? "text" : "password"} className="input login-input" placeholder="password" name="password" onChange={(e) => handleInput(e)} required />
                                    </div>
                                </div>
                                <div className="input_box">
                                    <label className="label">Confirm Password <span className="required">*</span></label>
                                    <div className="input_container password-eye">
                                        {
                                            eye2 ? <i onClick={CloseEye2} className="eye uil uil-eye"></i> :
                                                <i onClick={OpenEye2} className="eye uil uil-eye-slash"></i>
                                        }
                                        <input type={eye2 ? "text" : "password"} placeholder="confirm password" className="input login-input" name="confirmPassword" onChange={(e) => handleInput(e)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="login-links">
                                <p className="forgot-link">
                                    {/* <Link to="/forgot-password"> Forgot Password ?</Link> */}
                                </p>
                            </div>
                            <div className="button-container">
                                <button className="btn btn-2" onClick={() => navigate("/login")}>Login</button>
                                <button className="btn btn-large" onClick={(e) => register(e)}>{"Register"}</button>
                            </div>
                            <div className="or-text-box">
                                <div className="line"></div>
                                <p className="or-text">or</p>
                                <div className="line"></div>
                            </div>
                            <div className="social-container">
                                <Link to="/registerotp">
                                    <button className="social-button btn">Register With OTP</button>
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
