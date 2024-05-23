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

    const groupedItemsObj1 = {};
    const groupedItemsObj2 = {};

    if (userInfo) {
        items.forEach((item) => {
            item.shares.forEach((share) => {
                const { email, amount } = share;
                if (email !== userInfo.email) {
                    if (!groupedItemsObj1[email]) {
                        groupedItemsObj1[email] = {
                            email,
                            totalAmount: amount,
                        };
                        total += amount;
                        yao += amount;
                    } else {
                        groupedItemsObj1[email].totalAmount += amount;
                        total += amount;
                        yao += amount;
                    }
                }
            });
        });

        items.forEach((item) => {
            if (item.createdByEmail !== userInfo.email) {
                const matchedShare = item.shares.find((share) => share.email === userInfo.email);
                const matchedAmount = matchedShare ? matchedShare.amount : 0;
                const [email, amount] = [item.createdByEmail, matchedAmount];

                if (!groupedItemsObj2[email]) {
                    groupedItemsObj2[email] = {
                        email,
                        totalAmount: amount,
                    };
                    total -= amount;
                    yo -= amount;
                } else {
                    groupedItemsObj2[email].totalAmount += amount;
                    total -= amount;
                    yo -= amount;
                }
            }
        });
    }

    const groupedItems = Object.values(groupedItemsObj1);
    const groupedItems2 = Object.values(groupedItemsObj2);

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
                            <p className={`text-center fs-5  ${total < 0 ? "text-danger" : "text-success"}`}>
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
                            <p className={`text-center fs-5  ${yo < 0 ? "text-danger" : "text-success"}`}>${Math.abs(yo)}</p>
                        </div>
                    </div>
                </div>
                <div className="col align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column ">
                            <p className="text-center text-body-tertiary">You are owed</p>
                        </div>
                        <div className="row balance-column ">
                            <p className={`text-center fs-5  ${yao < 0 ? "text-danger" : "text-success"}`}>${Math.abs(yao)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-main ">
                <div className="dashboard-main-top">
                    <div className="row p-0 m-0">
                        <div className="col p-0 m-0">
                            <p className="fs-5 fw-medium ps-2  text-center border-bottom border-subtle  text-body-tertiary">You owe</p>
                            {groupedItems2 &&
                                groupedItems2.map((friend) => (
                                    <Link
                                        to={`/friend/${friend.email}`}
                                        className="listitem row m-0 text-decoration-none border-bottom border-subtle"
                                        key={friend.email}
                                    >
                                        <div className=" col-sm-12 col-lg-6">
                                            <p className="text-secondary fw-medium">{friend.email.split("@")[0]}</p>
                                        </div>
                                        <div className="col-sm-12 col-lg-6 d-flex align-items-center col-amount">
                                            <div>
                                                <p className="text-body-tertiary listitem-small">you owe</p>
                                                <p className="text-danger fs-5 listitem-small">${friend.totalAmount}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                        <div className="col p-0 m-0 border-start border-subtle">
                            <p className="fs-5 fw-medium pe-2 text-center border-bottom border-subtle  text-body-tertiary">You are owed</p>
                            {groupedItems &&
                                groupedItems.map((friend) => (
                                    <Link
                                        to={`/friend/${friend.email}`}
                                        className="listitem row m-0 text-decoration-none border-bottom border-subtle"
                                        key={friend.email}
                                    >
                                        <div className=" col-sm-12 col-lg-6">
                                            <p className="text-secondary fw-medium">{friend.email.split("@")[0]}</p>
                                        </div>
                                        <div className="col-sm-12 col-lg-6 d-flex align-items-center col-amount">
                                            <div>
                                                <p className="text-body-tertiary listitem-small">owes you</p>
                                                <p className="text-success fs-5 listitem-small">${friend.totalAmount}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
