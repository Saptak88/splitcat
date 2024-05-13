import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="navbar p-0">
            <div className="navbar-top pe-sm-5 ps-sm-5 pe-2 ps-2 border-bottom border-subtle">
                <Link to={"/"} className="brand fs-3 fw-medium text-dark">
                    Splitcat
                </Link>
                <a href="logout" className="text-dark fw-medium">
                    Log out
                </a>
            </div>
            <div className="navbar-bottom pe-sm-5 ps-sm-5 pe-2 ps-2 border-bottom border-subtle">
                <Link to="/dashboard" className="me-3 me-sm-4 text-dark fw-medium">
                    Dashboard
                </Link>
                <Link to="/activity" className=" text-dark fw-medium">
                    Recent Activity
                </Link>
            </div>
        </div>
    );
};

export default Header;
