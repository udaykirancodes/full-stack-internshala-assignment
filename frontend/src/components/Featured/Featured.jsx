import "./featuredinfo.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../pages/dummyData";
import Chart from "../Chart/Chart";
// import { SettingsBackupRestoreSharp } from "@material-ui/icons";
export default function FeaturedInfo() {
    const navigate = useNavigate();
    const [pending, setpending] = useState(0)

    return (
        <>
            <div className="featured">
                <div className="featuredItem">
                    <span className="featuredTitle">Number of Users </span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{123}</span>

                    </div>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Total Bookings</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{4524}</span>

                    </div>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Pending Bookings</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">
                            {
                                pending
                            }
                        </span>

                    </div>
                </div>

            </div>

        </>

    );
}