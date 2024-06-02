import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetItemsQuery } from "../slices/itemApiSlice";
import { useSelector } from "react-redux";
import { useDeleteItemsMutation } from "../slices/itemApiSlice";

const Itemscreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [deleteItems, { isLoading: isLoadingdel }] = useDeleteItemsMutation();
    const { data: items, isLoading, error, refetch: refetchItems } = useGetItemsQuery();
    const [openItemId, setOpenItemId] = useState(null);
    const [currDel, setCurrDel] = useState(null);

    const { id: friendName } = useParams();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const toggleListItem = (id) => {
        if (openItemId === id) {
            setOpenItemId(null);
        } else {
            setOpenItemId(id);
        }
    };

    const groupItemsByFriendName = (data, friendName) => {
        const result = data.filter((item) => item.createdByEmail === friendName || item.shares.some((share) => share.email === friendName));
        return result;
    };

    const groupedItems = groupItemsByFriendName(items, friendName);

    const findShareAmountByEmail = (expense, email) => {
        const share = expense.shares.find((share) => share.email === email);
        return share ? share.amount : null;
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
        event.preventDefault(); // Prevent the default action of the link

        try {
            // Send a POST request to delete the item
            setCurrDel(_id);
            await deleteItems({ _id });
            refetchItems();
        } catch (error) {
            setCurrDel(null);
            console.error("Error deleting item:", error);
            alert(error?.response.data.message);
        }
    };

    let yo = 0;
    let yao = 0;
    groupedItems.forEach((item) => {
        if (item.createdByEmail === userInfo.email) {
            const matchedShare = item.shares.find((share) => share.email === friendName);
            const matchedAmount = matchedShare ? matchedShare.amount : 0;
            yao += matchedAmount;
        } else {
            const matchedShare = item.shares.find((share) => share.email === userInfo.email);
            const matchedAmount = matchedShare ? matchedShare.amount : 0;
            yo += matchedAmount;
        }
    });

    return (
        <div className="dashboard-outer border-start border-end border-subtle">
            <div className="dashboard-top border-bottom border-subtle">
                <p className="fs-4 fw-medium  text-dark">{friendName.split("@")[0]}</p>
                <button className="btn btn-primary ">Settle up</button>
            </div>
            <div className="row border-bottom border-subtle m-0 p-0 dashboard-balance">
                <div className="col border-end border-subtle align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary ">You owe</p>
                        </div>
                        <div className="row balance-column">
                            <p className="text-center text-danger fs-5">${yo}</p>
                        </div>
                    </div>
                </div>

                <div className="col  align-items-center d-flex">
                    <div className="col balance">
                        <div className="row balance-column">
                            <p className="text-center text-body-tertiary">You are owed</p>
                        </div>
                        <div className="row balance-column">
                            <p className="text-center text-success fs-5">${yao}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-main ">
                <div className="row p-0 m-0">
                    <div className="col p-0 m-0">
                        {groupedItems.map((item) => {
                            const lentEmail = item.createdByEmail === friendName ? userInfo.email : friendName;
                            const shareAmount = findShareAmountByEmail(item, lentEmail);
                            return (
                                <div className="listitem row m-0 text-decoration-none border-bottom border-subtle" key={item._id}>
                                    <div className="listitem-top d-flex">
                                        <div className="col-11 d-flex h-100" onClick={() => toggleListItem(item._id)}>
                                            <div className="row m-0 p-0 w-100">
                                                <div className=" col-sm-8 col-12  d-flex align-items-center ps-0">
                                                    <p className="text-body-tertiary fw-medium">{item.title}</p>
                                                </div>
                                                <div className="col-sm-4 col-12  col-amount d-flex align-items-center ps-0">
                                                    <div className="row w-100 m-0 p-0">
                                                        <div className="col m-0 p-0">
                                                            <p className="text-body-tertiary listitem-small">
                                                                {item.createdByEmail !== friendName
                                                                    ? "You paid"
                                                                    : `${friendName.split("@")[0]} paid`}
                                                            </p>
                                                            <p className="text-body-tertiary fs-5 listitem-small">${item.totalAmount}</p>
                                                        </div>
                                                        <div className="col m-0 p-0">
                                                            <p className="text-body-tertiary listitem-small">
                                                                {item.createdByEmail !== friendName
                                                                    ? `You lent ${friendName.split("@")[0]}`
                                                                    : `${friendName.split("@")[0]} lent you`}
                                                            </p>
                                                            <p className="text-body-tertiary fs-5 listitem-small">${shareAmount}</p>
                                                        </div>
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
                                        <div className={`lb-inside`}>
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itemscreen;
