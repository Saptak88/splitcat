import React, { useState, useEffect } from "react";
const Activity = () => {
    const [count, setCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) {
            console.log("Count changed:", count);
            // Any side effect code you want to run when count changes
        } else {
            setIsMounted(true);
        }
    }, [count, isMounted]); // count is included in the dependency array

    const incrementCount = () => {
        setCount(count + 1);
    };
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={incrementCount}>Increment</button>
        </div>
    );
};

export default Activity;
