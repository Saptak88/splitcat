import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetItemsQuery } from "../slices/itemApiSlice";
import { useSelector } from "react-redux";

const Modal = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [paidBy, setPaidBy] = useState(userInfo ? userInfo.email : null);
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [emailList, setEmailList] = useState([{ email: userInfo ? userInfo.email : null, amount: "0.00" }]);
    const { refetch: refetchItems } = useGetItemsQuery();
    const [split, setSplit] = useState(0);

    const handleAmountChange = (index, newAmount) => {
        const updatedEmailList = emailList.map((emailObj, i) => (i === index ? { ...emailObj, amount: newAmount } : emailObj));
        setEmailList(updatedEmailList);
    };

    useEffect(() => {
        if (split === 0 && amount && emailList.length > 0) {
            const splitAmount = parseFloat(amount) / emailList.length;
            const updatedEmailList = emailList.map((emailObj) => ({
                ...emailObj,
                amount: splitAmount.toFixed(2),
            }));
            setEmailList(updatedEmailList);
        }
    }, [amount, emailList.length, split]);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRemoveEmail = (index) => {
        const newEmailList = emailList.filter((_, i) => i !== index);
        setEmailList(newEmailList);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (email && validateEmail(email) && email !== userInfo.email) {
                setEmailList([...emailList, { email, amount: "0.00" }]);
                setEmail("");
            } else {
                alert("Please enter a valid email address.");
            }
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const formattedToday = `${yyyy}-${mm}-${dd}`;

        setDate(formattedToday);
    }, []);
    if (!userInfo) {
        return <div></div>;
    }
    const remain = amount - emailList.reduce((sum, emailObj) => sum + parseFloat(emailObj.amount || 0), 0);
    //handlesubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title,
            amount,
            date,
            emailList,
            notes,
            paidBy,
        };
        if (emailList.length < 2) {
            alert("Enter email to add expense with.");
        } else if (title === "") {
            alert("Title cannot be empty.");
        } else if (amount === "") {
            alert("Amount cannot be empty.");
        } else if (remain >= 1 || remain <= -1) {
            alert("Enter valid share amounts.");
        } else {
            try {
                const response = await axios.post("/api/v1/items/add", formData);
                setTitle("");
                setAmount("");
                setEmail("");
                setEmailList([]);
                if (response.status === 200) {
                    refetchItems();
                    const closeButton = document.querySelector("#exampleModal #btn-close");
                    closeButton.click();
                }
            } catch (error) {
                console.error("Error sending data to backend:", error);
            }
        }
    };
    const handleAddButtonClick = () => {
        // Submit the form when the button is clicked
        handleSubmit(new Event("submit"));
    };

    return (
        <div>
            {/* sub modal split ratio below */}
            <div
                className="modal fade"
                id="exampleModalToggle3"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel2"
                tabIndex="-1"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header pt-2 pb-2">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                                Split options
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column justify-content-center">
                            <div className="split-capsule">
                                <button
                                    className={`spc-btn border-top border-start border-bottom border-end border-dark-subtle ${
                                        split === 0 ? "spc-active" : ""
                                    }`}
                                    style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}
                                    onClick={() => setSplit(0)}
                                >
                                    =
                                </button>
                                <button
                                    className={`spc-btn border-top border-bottom border-end border-dark-subtle ${
                                        split === 1 ? "spc-active" : ""
                                    }`}
                                    onClick={() => setSplit(1)}
                                >
                                    1.16
                                </button>
                                <button
                                    className={`spc-btn border-top border-bottom border-end border-dark-subtle  ${
                                        split === 2 ? "spc-active" : ""
                                    }`}
                                    style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
                                    onClick={() => setSplit(2)}
                                >
                                    %
                                </button>
                                {/*<button
                                    className={`spc-btn border-top border-bottom border-end border-dark-subtle ${
                                        split === 3 ? "spc-active" : ""
                                    }`}
                                    style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
                                    onClick={() => setSplit(3)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-bar-chart"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z" />
                                    </svg>
                                </button>*/}
                            </div>
                            {split === 0 && (
                                <div>
                                    <p className="fs-5 text-secondary fw-medium">Split equally</p>
                                    <ul className="mb-0 ps-0">
                                        {emailList.map((e, index) => (
                                            <li
                                                key={index}
                                                style={{ listStyle: "none" }}
                                                className="text-secondary fw-medium d-flex justify-content-between align-items-center mt-1"
                                            >
                                                {e.email === userInfo.email ? "you" : e.email.split("@")[0]}
                                                <p className="fs-5">${e.amount}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {split === 1 && (
                                <div>
                                    <p className="fs-5 text-secondary fw-medium">Split by amount</p>
                                    <ul className="mb-0 ps-0">
                                        {emailList.map((e, index) => (
                                            <li
                                                key={index}
                                                style={{ listStyle: "none" }}
                                                className="text-secondary fw-medium d-flex justify-content-between align-items-center mt-1"
                                            >
                                                {e.email === userInfo.email ? "you" : e.email.split("@")[0]}
                                                <div className="d-flex  justify-content-end">
                                                    <span className="add-on currency_symbol">$</span>
                                                    <input
                                                        type="text"
                                                        className="spl-ami"
                                                        value={e.amount}
                                                        onChange={(event) => handleAmountChange(index, parseFloat(event.target.value || 0))}
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-dark fw-medium">Remaining amount: ${remain.toFixed(2)}</p>
                                </div>
                            )}
                            {split === 2 && (
                                <div>
                                    <p className="fs-5 text-secondary fw-medium">Split by percentages</p>
                                    <ul className="mb-0 ps-0">
                                        {emailList.map((e, index) => (
                                            <li
                                                key={index}
                                                style={{ listStyle: "none" }}
                                                className="text-secondary fw-medium d-flex justify-content-between align-items-center mt-1"
                                            >
                                                {e.email === userInfo.email ? "you" : e.email.split("@")[0]}
                                                <div className="d-flex  justify-content-end">
                                                    <span className="add-on currency_symbol">%</span>
                                                    <input
                                                        type="text"
                                                        className="spl-ami"
                                                        value={((parseFloat(e.amount) / parseFloat(amount)) * 100).toFixed(0)}
                                                        onChange={(event) =>
                                                            handleAmountChange(
                                                                index,
                                                                ((parseFloat(event.target.value || 0) * parseFloat(amount)) / 100).toFixed(
                                                                    2
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {split === 3 && (
                                <div>
                                    <p className="fs-5 text-secondary fw-medium">Split by shares</p>
                                    <ul className="mb-0 ps-0">
                                        {emailList.map((e, index) => (
                                            <li
                                                key={index}
                                                style={{ listStyle: "none" }}
                                                className="text-secondary fw-medium d-flex justify-content-between align-items-center mt-1"
                                            >
                                                {e.email === userInfo.email ? "you" : e.email.split("@")[0]}
                                                <div className="d-flex  justify-content-end">
                                                    <span className="add-on currency_symbol">share(s)</span>
                                                    <input type="text" className="spl-ami" />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer pt-2 pb-2">
                            <button className="btn btn-primary" data-bs-target="#exampleModal" data-bs-toggle="modal">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* sub modal add notes below */}
            <div
                className="modal fade"
                id="exampleModalToggle2"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel2"
                tabIndex="-1"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header pt-2 pb-2">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                                Add notes
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center">
                            <textarea
                                className="p-1 texti-area"
                                name="notes"
                                rows={4}
                                cols={50}
                                placeholder="Add notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer pt-2 pb-2">
                            <button className="btn btn-primary" data-bs-target="#exampleModal" data-bs-toggle="modal">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main modal below */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content ">
                        <div className="modal-header pt-2 pb-2">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add an expense
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0 m-0">
                            <div className={emailList.length > 1 ? "border-bottom border-subtle" : ""}>
                                <div className="emaillist mb-2">
                                    <ul className="emaillist-ul ms-4 me-4">
                                        <li className="mt-2 me-2 large-display" style={{ listStyle: "none" }}>
                                            <p className="fw-medium  ">With you and:</p>
                                        </li>

                                        {emailList.map(
                                            (email, index) =>
                                                index > 0 && (
                                                    <li key={index} className="mt-2 me-2 emaillist-li" style={{ listStyle: "none" }}>
                                                        {email.email}
                                                        <button className="" onClick={() => handleRemoveEmail(index)} type="button">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="10"
                                                                height="10"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                                <path d="M0 0h24v24H0z" fill="none" />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                )
                                        )}
                                        <li className="mt-2  ex-email-li" style={{ listStyle: "none" }}>
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Enter email"
                                                className="ex-email"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={`emaillist-bottom border-bottom border-top text-secondary ps-4 border-subtle ${
                                        email !== "" ? "" : "visually-hidden"
                                    } `}
                                >
                                    Press Enter to add email
                                </div>
                            </div>
                            <div className={`row m-2 p-0 ${emailList.length > 1 ? "" : "visually-hidden"}`}>
                                <div className="col-12">
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Title"
                                        className="add-ex fs-5 mb-2"
                                    />

                                    <div className="d-flex align-items-center mb-2">
                                        <p className="fs-5">$</p>
                                        <input
                                            type="text"
                                            name="Amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="add-ex fs-4"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                                        <p className="fw-medium me-2">Paid by </p>
                                        {/* dropdown */}
                                        <div className="dropdown">
                                            <button className="btn-split me-2" data-bs-toggle="dropdown" aria-expanded="false">
                                                {paidBy === userInfo.email ? "you" : paidBy.split("@")[0]}
                                            </button>

                                            <ul className="dropdown-menu">
                                                {emailList.map((e, index) => (
                                                    <li key={index}>
                                                        <div className="dropdown-item" onClick={() => setPaidBy(e.email)}>
                                                            {e.email === userInfo.email ? "you" : e.email.split("@")[0]}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* dropdown */}
                                        <p className="fw-medium me-2">& split</p>
                                        <button className="btn-split" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">
                                            {split === 0
                                                ? "equally"
                                                : split === 1
                                                ? "by amount"
                                                : split === 2
                                                ? "by percentages"
                                                : "by shares"}
                                        </button>
                                        <p className="fw-medium me-2">.</p>
                                    </div>

                                    <div>
                                        <div className="row m-0 p-0 d-flex align-items-center">
                                            <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center mb-2">
                                                <input
                                                    type="date"
                                                    className="btn btn-light"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    style={{ width: "160px" }}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center mb-2">
                                                <button
                                                    className="btn btn-primary"
                                                    style={{ width: "160px" }}
                                                    data-bs-target="#exampleModalToggle2"
                                                    data-bs-toggle="modal"
                                                >
                                                    Add notes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer pt-2 pb-2">
                            <button type="button" id="btn-close" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAddButtonClick}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
