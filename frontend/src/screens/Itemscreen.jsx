import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Itemscreen = () => {
    const [items, setItems] = useState([]);
    const [openItemId, setOpenItemId] = useState(null);

    const toggleListItem = (id) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/v1/dashboard");
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="dashboard-outer border-start border-end border-subtle">
            <div className="dashboard-top border-bottom border-subtle">
                <p className="fs-4 fw-medium  text-dark">Friend name</p>
                <button className="btn btn-primary ">Settle up</button>
            </div>
            <div className="row border-bottom border-subtle m-0 p-0 dashboard-balance">
                <div className="col border-end border-subtle align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary ">You owe</p>
                        </div>
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary">$300.00</p>
                        </div>
                    </div>
                </div>

                <div className="col  align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary">You are owed</p>
                        </div>
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary">$300.00</p>
                        </div>
                    </div>
                </div>
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

export default Itemscreen;
