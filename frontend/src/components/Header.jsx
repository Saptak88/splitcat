import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [headerLink, setheaderLink] = useState(0);
    const sidebarRef = useRef(null);

    const toggleHeader = (s) => {
        setheaderLink(s);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarOpen && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        if (sidebarOpen) {
            setTimeout(() => {
                document.addEventListener("click", handleOutsideClick);
            }, 100);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [sidebarOpen]);
    return (
        <div className="navbar p-0">
            <div className="navbar-top pe-sm-5 ps-sm-5 pe-2 ps-2 border-bottom border-subtle">
                <div className="d-flex align-items-center">
                    <button className="bg-white  me-2 ms-2  small-display border-none" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                            <path fill="none" d="M0 0h24v24H0V0z" />
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                        </svg>
                    </button>
                    <Link to={"/"} className="brand fs-2 fw-medium text-dark">
                        <img src={logo} alt="Logo" style={{ height: "50px" }} />
                        Splitcat
                    </Link>
                </div>
                <div className="big-display">
                    <Link
                        to="/dashboard"
                        className={`header-links ms-2  ${headerLink === 0 ? "hlopen" : ""} fw-medium`}
                        onClick={() => toggleHeader(0)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/allexpenses"
                        className={`header-links ms-2  ${headerLink === 1 ? "hlopen" : ""} fw-medium`}
                        onClick={() => toggleHeader(1)}
                    >
                        All Expenses
                    </Link>
                    <Link
                        to="/activity"
                        className={`header-links ms-2 ${headerLink === 2 ? "hlopen" : ""}  fw-medium`}
                        onClick={() => toggleHeader(2)}
                    >
                        Recent Activity
                    </Link>
                </div>
                <a href="logout" className="text-dark fw-medium">
                    Log out
                </a>
            </div>
            <div className={`sidbarscreen ${sidebarOpen ? "open" : ""}`}></div>
            <div className={`sidebar d-flex flex-column ${sidebarOpen ? "openside" : ""}`} ref={sidebarRef}>
                <div className="sidebar-top d-flex justify-content-between">
                    <p></p>
                    <button className="sidebar-close-btn p-2 border-rectangle btn btn-light" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                    </button>
                </div>
                <div className="col">
                    <div className="row m-0 p-0">
                        <Link to="/dashboard" className="sidebar-links text-dark fw-medium " onClick={toggleSidebar}>
                            Dashboard
                        </Link>
                    </div>
                    <div className="row m-0 p-0">
                        <Link to="/allexpenses" className="sidebar-links text-dark fw-medium " onClick={toggleSidebar}>
                            All Expenses
                        </Link>
                    </div>
                    <div className="row m-0 p-0">
                        <Link to="/activity" className="sidebar-links text-dark fw-medium  " onClick={toggleSidebar}>
                            Recent Activity
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
