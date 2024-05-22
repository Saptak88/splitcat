import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetItemsQuery } from "../slices/itemApiSlice";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

const Dashboard = () => {
    const { data: items, isLoading, error } = useGetItemsQuery();
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
        <div className=" dashboard-outer border-start border-end border-subtle">
            <Modal></Modal>
            <div className="dashboard-top border-bottom border-subtle">
                <p className="fs-4 fw-medium  text-dark">Dashboard</p>
                <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add new expense
                </button>
            </div>
            <div className="row border-bottom border-subtle m-0 p-0 dashboard-balance">
                <div className="col border-end border-subtle align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary ">Total balance</p>
                        </div>
                        <div className="row balance-column">
                            <p className={`text-center  ${total < 0 ? "text-danger" : "text-success"}`}>
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
                            <p className={`text-center  ${yo < 0 ? "text-danger" : "text-success"}`}>${Math.abs(yo)}</p>
                        </div>
                    </div>
                </div>
                <div className="col align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column ">
                            <p className="text-center text-body-tertiary">You are owed</p>
                        </div>
                        <div className="row balance-column ">
                            <p className={`text-center  ${yao < 0 ? "text-danger" : "text-success"}`}>${Math.abs(yao)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-main ">
                <div className="dashboard-main-top">
                    <div className="row p-0 m-0">
                        <div className="col p-0 m-0">
                            <p className="fs-5 fw-medium ps-2  text-center border-bottom border-subtle  text-body-tertiary">You owe</p>
                            {items.map(
                                (item) =>
                                    item.type === 0 && (
                                        <Link
                                            to={`/item/${item.bill_id}`}
                                            className="listitem row m-0 text-decoration-none border-bottom border-subtle"
                                            key={item.bill_id}
                                        >
                                            <div className=" col-sm-12 col-lg-6">
                                                <p className="text-secondary fw-medium">Friend name</p>
                                            </div>
                                            <div className="col-sm-12 col-lg-6 d-flex align-items-center">
                                                <div>
                                                    <p className="text-body-tertiary listitem-small">you owe</p>
                                                    <p className="text-danger fs-5 listitem-small">${item.total_amount}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                            )}
                        </div>
                        <div className="col p-0 m-0 border-start border-subtle">
                            <p className="fs-5 fw-medium pe-2 text-center border-bottom border-subtle  text-body-tertiary">You are owed</p>
                            {items.map(
                                (item) =>
                                    item.type === 1 && (
                                        <Link
                                            to={`/item/${item.bill_id}`}
                                            className="listitem row m-0 text-decoration-none border-bottom border-subtle"
                                            key={item.bill_id}
                                        >
                                            <div className=" col-sm-12 col-lg-6">
                                                <p className="text-secondary fw-medium">Friend name</p>
                                            </div>
                                            <div className="col-sm-12 col-lg-6 d-flex align-items-center">
                                                <div>
                                                    <p className="text-body-tertiary listitem-small">owes you</p>
                                                    <p className="text-success fs-5 listitem-small">${item.total_amount}</p>
                                                </div>
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
