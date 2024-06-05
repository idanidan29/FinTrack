import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/transactions.css';

const Transactions = () => {
    const { data } = useParams();
    const [category, setCategory] = useState('Expenses');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleCurrencyChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = {
            category: category,
            amount: amount,
            date: date,
            description: description,
            userUserName: data
        };

        try {
            const response = await axios.post('http://localhost:5073/Transactions',newTransaction);
            console.log('Transaction added:', response.data);

            // Reset the form state
            setDescription('');
            setAmount('');
            setDate(new Date().toISOString().split('T')[0]);
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Failed to add transaction. Please try again.');
        }
    };

    return (
        <div>
        <div className="HeadTitle">
                <h1>Transactions <span>Make a Transaction</span></h1>
        </div>
        <div className="transactions">
            
            <div className="create-transaction">
                <h2>Create Transaction</h2>
                <form onSubmit={handleSubmit}>
                    <label>Category:</label>
                    <select id="category" value={category} onChange={handleCurrencyChange}>
                        <option value="Expenses">Expense</option>
                        <option value="Income">Income</option>
                    </select>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <button type="submit">Add Transaction</button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default Transactions;
