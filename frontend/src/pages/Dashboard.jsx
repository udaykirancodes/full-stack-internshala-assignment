import Chart from "../components/Chart/Chart";
import FeaturedInfo from "../components/Featured/Featured"
import "./home.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { userData } from "./dummyData"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { dataurl } from "../urls";
export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: 'No Name',
        contact: 'No Contact',
        email: 'No Email'
    })

    const getUserData = async () => {
        let token = localStorage.getItem('token');
        if (!token) return;
        let { data } = await axios({
            method: "get",
            url: dataurl,
            headers: { "Content-Type": "application/json", "token": token },
            validateStatus: false
        })
        console.log(data);
        if (data.success) {
            setUser(data.data);
        }
    }

    // get all the users
    useEffect(() => {
        let authToken = localStorage.getItem('token');
        if (!authToken) {
            navigate('/login');
            return;
        }
        getUserData();
    }, [])

    return (
        <>
            <Topbar />
            <div className="adminContainer">
                <Sidebar />
                <FeaturedInfo />
            </div>
            <div className="home" >
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px' }}>

                    <div className="" style={{ color: 'blue', width: 'auto', height: '150px', borderRadius: '5px', backgroundColor: 'white', padding: '10px', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: 'black' }}>Name : </p> {user.name}
                    </div>
                    <div className="" style={{ color: 'blue', width: 'auto', height: '150px', borderRadius: '5px', backgroundColor: 'white', padding: '10px', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: 'black' }}>Email : </p> {user.email}
                    </div>
                    <div className="" style={{ color: 'blue', width: 'auto', height: '150px', borderRadius: '5px', backgroundColor: 'white', padding: '10px', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: 'black' }}>Contact : </p> {user.contact}
                    </div>
                </div>
                <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
            </div>
        </>
    );
}