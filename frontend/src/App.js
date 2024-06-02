import React from "react";
import Header from "./components/Header";
import MinHeader from "./components/MinHeader";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./slices/authSlice";
import { useEffect } from "react";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const expirationTime = localStorage.getItem("expirationTime");
        if (expirationTime) {
            const currentTime = new Date().getTime();

            if (currentTime > expirationTime) {
                dispatch(logout());
            }
        }
    }, [dispatch]);

    const location = useLocation();
    // Check if the current route is the login route
    const isLoginRoute = location.pathname === "/login" || location.pathname === "/register";
    const isHomeRoute = location.pathname === "/";
    return (
        <div>
            {!isLoginRoute && !isHomeRoute && <Header />}
            {isHomeRoute && <MinHeader />}
            <div className={!isHomeRoute ? "body-content ps-sm-5 pe-sm-5 ps-2 pe-2" : ""}>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default App;
