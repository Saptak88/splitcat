import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Header></Header>
            <div className="body-content ps-sm-5 pe-sm-5 ps-2 pe-2 ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default App;
