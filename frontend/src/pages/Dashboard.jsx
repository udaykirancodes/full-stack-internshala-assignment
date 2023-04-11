import Chart from "../components/Chart/Chart";
import FeaturedInfo from "../components/Featured/Featured"
import "./home.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { userData } from "./dummyData"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: 'No Name',
        contact: 'No Contact',
        email: 'No Email'
    })

    // get all the users
    useEffect(() => {
        let authToken = localStorage.getItem('token');
        if (!authToken) {
            navigate('/login');
            return;
        }

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

                    <div className="" style={{ width: '200px', height: '150px', borderRadius: '5px', backgroundColor: 'white', padding: '10px', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Name : {user.name}
                    </div>
                    <div className="" style={{ width: '200px', height: '150px', borderRadius: '5px', backgroundColor: 'white', padding: '10px', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Email : {user.email}
                    </div>
                    <div className="" style={{ width: '200px', height: '150px', borderRadius: '5px', backgroundColor: 'white', padding: '10px', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Contact : {user.contact}
                    </div>
                </div>
                <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
            </div>
        </>
    );
}