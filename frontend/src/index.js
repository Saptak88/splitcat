import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./screens/Dashboard";
import Activity from "./screens/Activity";
import Itemscreen from "./screens/Itemscreen";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App></App>}>
            <Route index={true} path="/" element={<Dashboard></Dashboard>}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/activity" element={<Activity />}></Route>
            <Route path="/item/:id" element={<Itemscreen />}></Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
