import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/history.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const { data } = useParams();
    const [filter, setFilter] = useState('all'); 

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:5073/Transactions/${data}`);
            setTransactions(response.data);
        } catch (error) {
            setTransactions([]);
        }
    };

    useEffect(() => {
        fetchTransactions(); 
    }, [data]); 

    const filteredTransactions = filter === 'all' ? transactions : transactions.filter(transaction => transaction.category.toLowerCase() === filter);

    const handleFilterChange = (event) => {
        setFilter(event.target.value.toLowerCase());
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5073/Transactions/${id}`);
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <div className="history-container">
            <div className="HeadTitle">
                <h1>HISTORY<span>your past transactions</span></h1>
            </div>
            <div className="filter-container">
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="expenses">Expenses</option>
                    <option value="income">Income</option>
                </select>
            </div>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="history-lanes">
                    {filteredTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(transaction.clientId)}><FontAwesomeIcon icon={faTrash} /></button>
                                <button className="edit"><FontAwesomeIcon icon={faPenToSquare} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
