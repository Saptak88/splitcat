import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/dashboard");
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    let total = 0;
    let yo = 0;
    let yao = 0;
    items.forEach((item) => {
        if (item.type === 0) {
            yo -= item.total_amount;
        }
    });
    items.forEach((item) => {
        if (item.type === 1) {
            yao += item.total_amount;
        }
    });
    items.forEach((item) => {
        if (item.type === 0) {
            total -= item.total_amount;
        } else {
            total += item.total_amount;
        }
    });

    return (
        <div className="dashboard-outer border-start border-end border-subtle">
            <div className="dashboard-top border-bottom border-subtle">
                <p className="fs-4 fw-medium  text-dark">Dashboard</p>
                <button className="btn btn-primary ">Add new expense</button>
            </div>
            <div className="row border-bottom border-subtle m-0 p-0 dashboard-balance">
                <div className="col border-end border-subtle align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary ">Total balance</p>
                        </div>
                        <div className="row balance-column">
                            <p className={`text-center text-opacity-75 ${total < 0 ? "text-danger" : "text-success"}`}>
                                {total < 0 ? "-" : ""}${Math.abs(total)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col border-end border-subtle align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary">You owe</p>
                        </div>
                        <div className="row balance-column">
                            <p className={`text-center text-opacity-75 ${yo < 0 ? "text-danger" : "text-success"}`}>
                                {yo < 0 ? "-" : ""}${Math.abs(yo)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column ">
                            <p className="text-center text-body-tertiary">You are owed</p>
                        </div>
                        <div className="row balance-column ">
                            <p className={`text-center text-opacity-75 ${yao < 0 ? "text-danger" : "text-success"}`}>
                                {yao < 0 ? "-" : ""}${Math.abs(yao)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-main">
                <div className="dashboard-main-top">
                    <div className="row p-0 m-0">
                        <div className="col p-0 m-0">
                            <p className="fs-5 fw-medium ps-2   text-body-tertiary">You owe</p>
                            {items.map(
                                (item) =>
                                    item.type === 0 && (
                                        <Link to={`/item/${item._id}`} className="listitem row m-0 text-decoration-none" key={item.bill_id}>
                                            <div className=" col-sm-12 col-lg-6">
                                                <p className="text-body-tertiary fw-medium">{item.bill_name}</p>
                                            </div>
                                            <div className="col-sm-12 col-lg-6 pb-1">
                                                <p className="text-body-tertiary listitem-small">Anount</p>
                                                <p className="text-body-tertiary listitem-small">${item.total_amount}</p>
                                            </div>
                                        </Link>
                                    )
                            )}
                        </div>
                        <div className="col p-0 m-0">
                            <p className="fs-5 fw-medium ps-2  text-body-tertiary">You are owed</p>
                            {items.map(
                                (item) =>
                                    item.type === 1 && (
                                        <Link to={`/item/${item._id}`} className="listitem row m-0 text-decoration-none" key={item.bill_id}>
                                            <div className=" col-sm-12 col-lg-6">
                                                <p className="text-body-tertiary fw-medium">{item.bill_name}</p>
                                            </div>
                                            <div className="col-sm-12 col-lg-6 pb-1">
                                                <p className="text-body-tertiary listitem-small">Amount</p>
                                                <p className="text-body-tertiary listitem-small">${item.total_amount}</p>
                                            </div>
                                        </Link>
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
