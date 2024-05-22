import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import Dashboard from "./screens/Dashboard";
import Activity from "./screens/Activity";
import Itemscreen from "./screens/Itemscreen";
import Allexpenses from "./screens/Allexpenses";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Register from "./components/Register";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App></App>}>
            <Route index={true} path="/" element={<Homepage></Homepage>}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/allexpenses" element={<Allexpenses />}></Route>
            <Route path="/activity" element={<Activity />}></Route>
            <Route path="/item/:id" element={<Itemscreen />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
