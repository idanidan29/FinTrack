import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faMoneyBillTransfer, faClockRotateLeft, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import CurrentDate from './CurrentDate';
import '../assets/styles/toolbar.css';
const ToolBar = () => {
    const { data } = useParams();

    return (
        <div className="toolbar">
            <div className="toolbar__logo">
                <div className="toolbar__logo-link">
                    <a href={`/Dashboard/${data}`}>FinTrack</a>
                </div>
            </div>
            <CurrentDate className="date" />
            <div className="toolbar__nav">
                <ul>
                    <li><a href={`/Dashboard/${data}`}><FontAwesomeIcon icon={faHouse} /></a></li>
                    <li><a href={`/Profile/${data}`}><FontAwesomeIcon icon={faUser} /></a></li>
                    <li><a href={`/Transactions/${data}`}><FontAwesomeIcon icon={faMoneyBillTransfer} /></a></li>
                    <li><a href={`/History/${data}`}><FontAwesomeIcon icon={faClockRotateLeft} /></a></li>
                    <li><a href={`/Instructions/${data}`}><FontAwesomeIcon icon={faCircleInfo} /></a></li>
                </ul>
            </div>
        </div>
    );
};
export default ToolBar; 