import React from "react";
import Header from "./components/Header";
import MinHeader from "./components/MinHeader";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
    const location = useLocation();
    // Check if the current route is the login route
    const isLoginRoute = location.pathname === "/signin";
    return (
        <div>
            {!isLoginRoute && <Header />}
            {isLoginRoute && <MinHeader />}
            <div className="body-content ps-sm-5 pe-sm-5 ps-2 pe-2 ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default App;
