import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import '../assets/styles/Dashboard.css';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js;
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

const Dashboard = () => {
    const { data } = useParams();
    const [financialData, setFinancialData] = useState(null); // State to hold financial data

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                const response = await axios.get(`http://localhost:5073/Users/${data}`);
                setFinancialData(response.data); // Update financialData state with fetched data
            } catch (error) {
                console.error('Error fetching financial data:', error);
            }
        };

        if (data) {
            fetchFinancialData(); // Fetch financial data only if data is available
        }
    }, [data]); // Trigger effect when data changes

    if (!financialData) {
        return <div>Loading...</div>; // Display loading indicator while fetching data
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
    const currentYear = currentDate.getFullYear();

    const currentMonthData = financialData.monthlyData.find(month =>
        month.monthNumber === currentMonth && month.year === currentYear
    );
    const barchartData = {
        labels: financialData.monthlyData.map(month => `${month.year}/${month.monthNumber}`),
        datasets: [
            {
                label: 'Income',
                backgroundColor: 'rgba(36,36,36,1)', 
                borderColor: 'rgba(36, 36, 36, 1)',
                borderWidth: 1,
                data: financialData.monthlyData.map(month => month.income + month.salary),
            },
            {
                label: 'Expenses',
                backgroundColor: 'rgb(59 59 59)', 
                borderColor: 'rgb(59 59 59)',
                borderWidth: 1,
                data: financialData.monthlyData.map(month => month.spendings + month.monthly_expenses),
            },
        ],
    };
    const baroptions = {
        plugins: {
            datalabels: {
                color: '#1a1a1a',
                backgroundColor: 'rgba(36,36,36,1)', 
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgba(36,36,36,1)', 
                },
            },
            y: {
                type: 'linear', 
                ticks: {
                    beginAtZero: true,
                    color: 'rgba(36,36,36,1)', 
                },
            },
        },
    };
    const linechartData = {
        labels: financialData.monthlyData.map(month => `${month.year}/${month.monthNumber}`),
        datasets: [
            {
                label: 'balance',
                data: financialData.monthlyData.map(month => month.balance),
                fill: false,
                borderColor: 'rgba(36,36,36,1)',
                labelColor: 'rgba(36,36,36,1)',
                backgroundColor: 'rgba(36,36,36,1)',
                tension: 0.1,
            },
        ],
    };
    const lineoptions = {
        scales: {
            x: {
                ticks: {
                    color: 'rgba(36, 36, 36, 1)', // X axis ticks color
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(36, 36, 36, 1)', // Y axis ticks color
                },
            },
        },
    };

    const combinedLabelEx = [
        ...currentMonthData.expensesTrans.map(trans => `${trans.description}`),
        `Monthly Expenses`
    ];
    const combinedLabelIn = [
        ...currentMonthData.incomeTrans.map(trans => `${trans.description}`),
        `Salary`
    ];

    const piechartDataEx = {
        labels: combinedLabelEx,
        datasets: [
            {
                label: 'Expenses',
                data: [
                    ...currentMonthData.expensesTrans.map(trans => trans.amount),
                    financialData.spendings
                ],
                backgroundColor: [
                    'rgb(68 68 68)',
                    'rgb(113 112 116)',
                    'rgb(36 36 36)',
                    '#ccc',
                    '#1a1a1ae0',
                ],
                borderColor: [
                    'rgb(68 68 68)',
                    'rgb(113 112 116)',
                    'rgb(36 36 36)',
                    '#ccc',
                    '#1a1a1ae0',
                ],
                borderWidth: 1,
            },
        ],
    };
    const pieoptionsEx = {
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    const piechartDataIn = {
        labels: combinedLabelIn,
        datasets: [
            {
                label: 'Income',
                data: [
                    ...currentMonthData.incomeTrans.map(trans => trans.amount),
                    financialData.income
                ],
                backgroundColor: [
                    'rgb(68 68 68)',
                    'rgb(113 112 116)',
                    'rgb(36 36 36)',
                    '#ccc',
                    '#1a1a1ae0',
                ],
                borderColor: [
                    'rgb(68 68 68)',
                    'rgb(113 112 116)',
                    'rgb(36 36 36)',
                    '#ccc',
                    '#1a1a1ae0',
                ],
                borderWidth: 1,
            },
        ],
    };
    const pieoptionsIn = {
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
    <div>
        <div className="HeadTitle">
                <h1>HELLO {financialData.name}<span>take a look on your data</span></h1>
            </div>
        <div className="dashboard">
            <div className="widget">
                <h2>Current Balance</h2>
                <p>${financialData.balance}</p>
            </div>
            <div className="widget">
                <h2>Salary</h2>
                <p>${financialData.income}</p>
                </div>
            <div className="widget">
                    <h2>Monthly Expenses</h2>
                <p>${financialData.spendings}</p>
            </div>
            <div className="widget">
                <h2>Summery Charts</h2>
                <Line data={linechartData} options={lineoptions} />
                <Bar data={barchartData} options={baroptions} />
            </div >
            <div className="widget">
                <h2>Monthly Incomes</h2>
                <Pie data={piechartDataIn} options={pieoptionsIn} />
            </div>
            <div className="widget">
                <h2>Monthly spendings</h2>
                <Pie data={piechartDataEx} options={pieoptionsEx} />
            </div>
        </div >
    </div>
    );
};

export default Dashboard;
