import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetItemsQuery } from "../slices/itemApiSlice";

const Allexpenses = () => {
    const { data: items, isLoading, error } = useGetItemsQuery();
    const [openItemId, setOpenItemId] = useState(null);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const toggleListItem = (id) => {
        setOpenItemId(openItemId === id ? null : id);
    };

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
            <div className="dashboard-top border-bottom border-subtle">
                <p className="fs-4 fw-medium  text-dark">All expenses</p>
                <button className="btn btn-primary ">Add new expense</button>
            </div>

            <div className="dashboard-main ">
                <div className="row p-0 m-0">
                    <div className="col p-0 m-0">
                        {items.map((item) => (
                            <div
                                className="listitem row m-0 text-decoration-none border-bottom border-subtle"
                                key={item.bill_id}
                                onClick={() => toggleListItem(item.bill_id)}
                            >
                                <div className="listitem-top d-flex">
                                    <div className="col-11 ">
                                        <div className="row m-0 p-0 ">
                                            <div className=" col-sm-8 col-12 d-flex align-items-center">
                                                <p className="text-body-tertiary fw-medium">{item.bill_name}</p>
                                            </div>
                                            <div className="d-flex align-items-center col-sm-4 col-12">
                                                <div className="me-5">
                                                    <p className="text-body-tertiary listitem-small">You paid</p>
                                                    <p className="text-body-tertiary fs-5 listitem-small">${item.total_amount}</p>
                                                </div>
                                                <div className="me-2">
                                                    <p className="text-body-tertiary listitem-small">You lent Friend</p>
                                                    <p className="text-body-tertiary fs-5 listitem-small">${item.total_amount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 d-flex align-items-center justify-content-center">
                                        <Link to={`/delete/${item.bill_id}`} className="delete-close-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path
                                                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                                    fill="#B30000"
                                                />
                                                <path d="M0 0h24v24H0z" fill="none" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className={`listitem-bottom ${openItemId == item.bill_id ? "listopen" : ""}`}>
                                    <div className={`lb-inside ${openItemId == item.bill_id ? "listopen" : ""}`}>
                                        kalo biral fdskgjh gkfjhgkja kgjahjaksh kajgh gjfah kjgfhs kjasgfh askjgfh sglakjfh lksgfh laskfgh
                                        sglkh skgfjh skgfdjh skfdjh fskjdh fksdjgh{" "}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Allexpenses;
