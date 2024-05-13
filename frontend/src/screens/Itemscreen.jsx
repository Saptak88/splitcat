import React from "react";
import { useParams } from "react-router-dom";
import items from "../listitems";
import { Link } from "react-router-dom";

const Itemscreen = () => {
    const { id: itemId } = useParams();
    const item = items.find((p) => p._id === parseInt(itemId));
    return (
        <div className="dashboard-outer border-start border-end border-subtle">
            <div className="row border-bottom border-subtle m-0 p-0 dashboard-balance">
                <div className="col-10 col-lg-11 align-items-center d-flex ">
                    <p className="text-body-tertiary fw-medium ">Title: {item.tit}</p>
                </div>
                <Link
                    to={`/delete/${item._id}`}
                    className="border-rectangle col-2 col-lg-1 align-items-center d-flex btn btn-danger d-flex justify-content-center text-decoration-none "
                >
                    <p className="big-item text-light fw-medium ">Delete</p>
                    <div className="small-item ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="row border-bottom border-subtle m-0 p-0 dashboard-balance">
                <div className="col border-end border-subtle align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary ">Amount</p>
                        </div>
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary">$300.00</p>
                        </div>
                    </div>
                </div>
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
            <div className="row  m-0 p-0 ">
                <div className="col-sm-12 col-lg-6 align-items-center d-flex border-bottom-sm">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className=" text-body-tertiary fw-medium pt-1 pb-1">Description:</p>
                            <p className="text-body-tertiary fw-medium pb-1">{item.desc}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6 align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary fw-medium">No Image</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itemscreen;
