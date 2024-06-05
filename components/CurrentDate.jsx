import React, { useState, useEffect } from 'react';
import '../assets/styles/currentDate.css';
const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <p>{formatDate(currentDate)}</p>
        </div>
    );
};

export default CurrentDate;
