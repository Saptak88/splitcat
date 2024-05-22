import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const MinHeader = () => {
    return (
        <div className="navbar p-0 border-bottom border-dark position-fixed top-0">
            <div className="navbar-top pe-sm-5 ps-sm-5 pe-2 ps-2 ">
                <div className="d-flex align-items-center">
                    <Link to={"/"} className="brand  fw-medium text-dark">
                        <img src={logo} alt="Logo" style={{ height: "50px" }} />
                        Splitcat
                    </Link>
                </div>
            </div>
            <Link to="/login" className="signin-link  p-2">
                Sign in
            </Link>

            <Link to="/register" className="signup-link ms-2 large-display">
                Sign up
            </Link>
        </div>
    );
};

export default MinHeader;
