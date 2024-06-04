import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetItemsQuery } from "../slices/itemApiSlice";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import { useDeleteItemsMutation } from "../slices/itemApiSlice";

const Allexpenses = () => {
    const [deleteItems, { isLoading: isLoadingdel }] = useDeleteItemsMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: items, isLoading, error, refetch: refetchItems } = useGetItemsQuery();
    const [openItemId, setOpenItemId] = useState(null);
    const [currDel, setCurrDel] = useState(null);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const toggleListItem = (id) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    function formatDate(dateString) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const date = new Date(dateString);
        const monthIndex = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
        return formattedDate;
    }

    const handleDelete = async (_id, event) => {
        event.preventDefault();

        try {
            setCurrDel(_id);
            await deleteItems({ _id }).unwrap();
            refetchItems();
        } catch (error) {
            setCurrDel(null);
            console.log("Error deleting item:", error);
            alert(error?.data.message);
        }
    };

    return (
        <div className=" dashboard-outer border-start border-end border-subtle">
            <Modal></Modal>
            <div className="dashboard-top border-bottom border-subtle">
                <p className="fs-4 fw-medium  text-dark">All expenses</p>
                <button className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <p className="large-display">Add new expense</p>
                    <p className="small-display">Add</p>
                </button>
            </div>
            {items.length > 0 ? (
                <>
                    <div className="dashboard-main ">
                        <div className="row p-0 m-0">
                            <div className="col p-0 m-0">
                                {items.map((item) => (
                                    <div className="listitem row m-0 text-decoration-none border-bottom border-subtle" key={item._id}>
                                        <div className="listitem-top d-flex">
                                            <div className="col-11 d-flex h-100" onClick={() => toggleListItem(item._id)}>
                                                <div className="row m-0 p-0 w-100">
                                                    <div className=" col-sm-8 col-12 d-flex align-items-center ps-0">
                                                        <p className="text-body-tertiary fw-medium">{item.title}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center col-sm-4 col-12 col-amount ps-0">
                                                        <div className="me-5">
                                                            <p className="text-body-tertiary listitem-small">
                                                                {item.createdByEmail === userInfo.email
                                                                    ? "You paid"
                                                                    : `${item.createdByEmail.split("@")[0]} paid`}
                                                            </p>
                                                            <p className="text-body-tertiary fs-5 listitem-small">${item.totalAmount}</p>
                                                        </div>
                                                        <div className="me-2 visually-hidden">
                                                            <p className="text-body-tertiary listitem-small">You lent Friend</p>
                                                            <p className="text-body-tertiary fs-5 listitem-small">${"item.total_amount"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-1 d-flex align-items-center justify-content-center">
                                                <Link
                                                    to={`/delete/${item._id}`}
                                                    className="delete-close-btn"
                                                    onClick={(event) => handleDelete(item._id, event)}
                                                >
                                                    {!(isLoadingdel && currDel === item._id) ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path
                                                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                                                fill="#B30000"
                                                            />
                                                            <path d="M0 0h24v24H0z" fill="none" />
                                                        </svg>
                                                    ) : (
                                                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className={`listitem-bottom ${openItemId === item._id ? "listopen" : ""}`}>
                                            <div className={`lb-inside `}>
                                                <div className="row w-100 m-0 p-0 pb-2">
                                                    <div className="col-12 col-lg-6 pt-2 p-0">
                                                        <p className="text-body-tertiary fw-medium">{item.title}</p>
                                                        <p className="text-secondary fs-4 listitem-small">${item.totalAmount}</p>
                                                        <p
                                                            className="text-secondary pb-2 border-bottom border-subtle "
                                                            style={{ maxWidth: "100%", display: "inline" }}
                                                        >
                                                            Added by {item.createdByEmail.split("@")[0]} on {formatDate(item.date)}
                                                        </p>
                                                        <p className="text-body-tertiary fw-medium mt-2">
                                                            {item.createdByEmail.split("@")[0]} paid ${item.totalAmount}
                                                        </p>
                                                        {item.shares.map((s) => (
                                                            <p className="text-body-tertiary fw-medium " key={s.email}>
                                                                {s.email.split("@")[0]} owes ${s.amount}
                                                            </p>
                                                        ))}
                                                    </div>
                                                    <div className="col-12 col-lg-6 pt-2 p-0">
                                                        {item.notes && item.notes !== "" ? (
                                                            <>
                                                                <p className="fs-5 fw-medium text-secondary">Notes </p>
                                                                <p className="text-body-tertiary fw-medium">{item.notes}</p>
                                                            </>
                                                        ) : (
                                                            <div className=" d-flex h-100 align-items-center justify-content-center ">
                                                                <p className="fs-4 fw-medium text-body-tertiary">Notes empty</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <p className="text-center mt-5 fs-1 fs-medium text-secondary">You’re all settled up. Awesome!</p>
                    <p className="text-center mt-2 fs-3 fs-medium text-secondary">
                        To add a new expense, click the blue “Add an expense” button.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Allexpenses;
