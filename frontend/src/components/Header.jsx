import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const [headerLink, setheaderLink] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logouthandler = async (event) => {
        event.preventDefault();
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/signin");
        } catch (error) {
            console.log(error);
        }
    };

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
                    <button className="bg-white  me-2  small-display border-none" onClick={toggleSidebar}>
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
                <div class="dropdown">
                    <div class="user-profile-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className="large-display fw-medium">{userInfo ? userInfo.email.split("@")[0] : ""}</div>
                        <div className="small-display">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                class="bi bi-person"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        </div>
                    </div>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class="dropdown-item" href="/profile">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-person me-2"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                {userInfo ? userInfo.email.split("@")[0] : "Profile"}
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="/signout" onClick={logouthandler}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    className="me-2"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 5l7 7-7 7M3 12h18"></path>
                                </svg>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
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
