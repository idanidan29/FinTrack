import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/styles/profile.css';

const Profile = () => {
    const { data } = useParams();
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [salary, setSalary] = useState('');
    const [currency, setCurrency] = useState('$');
    const [spendings, setSpendings] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5073/Users/${data}`);
                const userData = response.data;

                setName(userData.name || '');
                setBalance(userData.balance || '');
                setSalary(userData.income || '');
                setCurrency(userData.currencyType || '$');
                setSpendings(userData.spendings || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [data]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleBalanceChange = (e) => {
        setBalance(e.target.value);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleMonthlyExpensesChange = (e) => {
        setSpendings(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!name || !balance) {
                alert('Please enter a name and balance');
                return;
            }

            const user = await axios.get(`http://localhost:5073/Users/${data}`);
            user.data.userName = data; 
            user.data.name = name;
            user.data.balance = balance;
            user.data.income = salary;
            user.data.spendings = spendings;
            const response = await axios.put('http://localhost:5073/Users', user.data);
            console.log('Response from server:', response);

            if (response.status === 200) {
                alert('Updates saved');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile. Please try again later.');
        }
    };

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:5073/Users/${data}`);
            console.log('Response from server:', response);

            if (response.status === 200) {
                alert('User deleted successfully');
                // Optionally, redirect or perform any other action after successful deletion
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user. Please try again later.');
        }
    };

    return (
        <div>
            <div className="HeadTitle">
                <h1>PROFILE<span>adjust your profile</span></h1>
            </div>
            <div className="profile">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={handleNameChange} />
                    </div>
                    <div>
                        <label htmlFor="balance">Balance:</label>
                        <input type="number" id="balance" value={balance} onChange={handleBalanceChange} />
                    </div>
                    <div>
                        <label htmlFor="salary">Salary:</label>
                        <input type="number" id="salary" value={salary} onChange={handleSalaryChange} />
                    </div>
                    <div>
                        <label htmlFor="monthlyExpenses">Monthly Expenses:</label>
                        <input type="number" id="monthlyExpenses" value={spendings} onChange={handleMonthlyExpensesChange} />
                    </div>
                    <div>
                        <label htmlFor="currencyType">Currency:</label>
                        <select id="currencyType" value={currency} onChange={handleCurrencyChange}>
                            <option value="$">USD ($)</option>
                            <option value="€">EUR (€)</option>
                            <option value="?">ILS (?)</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <Link to="/">
                    <button>Log Out</button>
                </Link>
                <Link to="/">
                    <button onClick={handleDeleteUser}>Delete User</button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
