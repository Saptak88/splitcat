import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import GridStructure from "./GridStructure";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/dashboard");
        }
    }, [userInfo, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };
    /*  if (isLoading) {
        return <div>Loading...</div>;
    }*/
    return (
        <div>
            <div className="navbar p-0">
                <div className="navbar-top">
                    <div className="d-flex align-items-center">
                        <Link to={"/"} className="brand  fw-medium text-dark">
                            <img src={logo} alt="Logo" style={{ height: "50px" }} />
                            Splitcat
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row mt-4 m-0 p-0">
                <div className="col-12 col-lg-6">
                    <div className="login-container">
                        <form onSubmit={handleSubmit} className="login-item">
                            <p className="fs-4 pb-2 pb-sm-3">Sign in to Splitcat</p>
                            <p className="fw-medium mb-1 mb-sm-2">Email</p>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@example.com"
                                required
                                className="finput mb-1 mb-sm-3"
                            />
                            <p className="fw-medium mb-1 mb-sm-2">Password</p>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="I love black cats"
                                required
                                className="finput  mb-1 mb-sm-3"
                            />

                            <button type="submit" className="signin-btn">
                                {isLoading ? <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> : "Sign in"}
                            </button>
                        </form>
                        <div className="d-flex mt-4">
                            <p className="me-1">Need an account? </p>
                            <Link to="/register" className="text-secondary">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6"></div>
            </div>
            <GridStructure></GridStructure>
        </div>
    );
}

export default Login;
