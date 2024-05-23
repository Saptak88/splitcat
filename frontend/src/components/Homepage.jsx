import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Homepage = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            navigate("/dashboard");
        }
    }, [userInfo, navigate]);

    return (
        <div>
            <div className="navbar-top"></div>

            <div className="homepage-container">
                <div className="row  ps-sm-5 pe-sm-5 ps-2 pe-2">
                    <div className="col mt-4">
                        <p className="fs-100px  fw-medium">Welcome to Splitcat</p>
                        <p className="fs-1 fw-medium">The Easiest Way to Split Bills with Friends and Family.</p>
                        <p className="fs-3 fw-medium">Effortless, Fair & Transparent.</p>
                        <div className="d-flex pt-4 pb-4">
                            <Link
                                to="/login"
                                className="btn btn-light border-rectangle d-flex align-items-center ps-4 pe-4"
                                style={{ fontSize: "20px" }}
                            >
                                Sign in
                            </Link>
                            <Link to="/login" className="signup-link ms-4  text-decoration-none">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row  ps-sm-5 pe-sm-5 ps-2 pe-2 bg-orange mt-4 pb-3">
                    <div className="col-12 col-lg-6 mt-2">
                        <p className="fs-1  fw-medium">Why Splitcat?</p>
                        <p className="fs-3 fw-medium">
                            Splitcat makes splitting bills simple and stress-free, whether you're sharing expenses with roommates, planning
                            a group trip, or dining out with friends. No more awkward money conversations or complicated calculations.
                        </p>
                    </div>
                    <div className="col-12 col-lg-6"></div>
                </div>
                <div className="row  ps-sm-5 pe-sm-5 ps-2 pe-2 mt-4">
                    <div className="col-12 col-lg-6 mt-2">
                        <p className="fs-1  fw-medium">How It Works</p>
                        <ul>
                            <li>
                                <p className="fs-3 fw-medium">
                                    Add Expenses: Enter expenses as they occur. Include details and even photos of receipts.
                                </p>
                            </li>
                            <li>
                                <p className="fs-3 fw-medium">
                                    Automatic Calculations: Splitcat does the math for you, ensuring everyone pays their fair share.
                                </p>
                            </li>
                            <li>
                                <p className="fs-3 fw-medium">Settle Up: Easily track who owes what and record cash settlements.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-6"></div>
                </div>
                <div className="row  ps-sm-5 pe-sm-5 ps-2 pe-2">
                    <div className="col mt-4">
                        <p className="fs-1 fw-medium">Get Started Today</p>
                        <p className="fs-3 fw-medium">
                            Join thousands of users who have already discovered the convenience of SplitCat. Sign up now and take the stress
                            out of splitting bills!
                        </p>
                    </div>
                </div>
            </div>
            <footer style={{ textAlign: "center", padding: "20px" }}>
                <p>&copy; {new Date().getFullYear()} Splitcat.</p>
            </footer>
        </div>
    );
};

export default Homepage;
