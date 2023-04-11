import React, { useState, useContext, useEffect } from "react";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
import { NotificationsNone } from "@material-ui/icons";
export default function Topbar() {
    const navigate = useNavigate();
    const [pending, setpending] = useState(0)
    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Admin Page</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">{pending}</span>
                    </div>
                    <button onClick={Logout} className="btn-sm btn-danger btn">Log Out</button>
                </div>
            </div>
        </div>
    );
}