import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const MinHeader = () => {
    return (
        <div className="navbar p-0">
            <div className="navbar-top pe-sm-5 ps-sm-5 pe-2 ps-2 ">
                <div className="d-flex align-items-center">
                    <Link to={"/"} className="brand fs-2 fw-medium text-dark">
                        <img src={logo} alt="Logo" style={{ height: "50px" }} />
                        Splitcat
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MinHeader;
