import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetItemsQuery } from "../slices/itemApiSlice";

const Modal = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [emailList, setEmailList] = useState([]);
    const { refetch: refetchItems } = useGetItemsQuery();

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
            if (email && validateEmail(email)) {
                setEmailList([...emailList, email]);
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

    //handlesubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title,
            amount,
            date,
            emailList,
        };

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
    };
    const handleAddButtonClick = () => {
        // Submit the form when the button is clicked
        handleSubmit(new Event("submit"));
    };
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add an expense
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0 m-0">
                            <form className="p-0 m-0">
                                <div className="border-bottom border-subtle">
                                    <div className="emaillist">
                                        <ul className="emaillist-ul ms-4 me-4">
                                            {emailList.map((email, index) => (
                                                <li key={index} className="mt-2 me-2 emaillist-li" style={{ listStyle: "none" }}>
                                                    {email}
                                                    <button className="ms-1" onClick={() => handleRemoveEmail(index)} type="button">
                                                        &times;
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="ms-4 me-4 mt-1 mb-1 d-flex align-items-center">
                                        <p className="fw-medium large-display me-2">With you and:</p>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Enter email & press Enter"
                                                className=" ex-email"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-2 p-0">
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Title"
                                            required
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
                                                required
                                                className="add-ex fs-4"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                                            <p className="fw-medium me-2">Paid by </p>
                                            <button className="btn-split me-2">you</button>
                                            <p className="fw-medium me-2">& split</p>
                                            <button className="btn-split">equally</button>
                                        </div>

                                        <div>
                                            <div className="row m-0 p-0 d-flex align-items-center">
                                                <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center mb-2">
                                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                                </div>
                                                <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center mb-2">
                                                    <button className="btn btn-primary">Add image/notes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
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
