import React, {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {ToastContainer} from "react-toastify";

import "./static/App.css"
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

    const location = useLocation();

    const navigate = useNavigate();

    const [height, setHeight] = React.useState(100);

    useEffect(() => {
        if (location.pathname === "/auth") {
            setHeight(40);
        }
        if (location.pathname === "/") {
            setHeight(100);
        }
    }, [location]);

    function navClick(e) {
        e.preventDefault();

        setTimeout(() => {
            navigate("/home/files");
        }, 500)
    }

    return (
        <div id="app-container">
            <ToastContainer style={{zIndex: 99999999}}/>
            {(location.pathname === "/" || location.pathname === "/auth") && (
                <div className={`welcome-container ${height < 100 ? 'transition' : ''}`}
                     style={{height: `${height}vh`, paddingTop: "15%"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                        <h1 style={{fontSize: '70px', textAlign: "center", marginBottom: "5%"}}>Welcome to Ulake
                            Textr</h1>
                        <Button id="welcome-btn" onClick={navClick} hidden={location.pathname === "/auth"}>Getting
                            Started</Button>
                    </div>
                </div>
            )}
            <Outlet/>
        </div>
    );
}