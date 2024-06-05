import React from 'react';
import '../assets/styles/instructions.css';
const Instructions = () => {
    return (
        <div className="instructions-container">
            <div className="HeadTitle">
                <h1>Instructions<span>a quick guide about the app</span></h1>
            </div>
            <p>Welcome to FinTrack! This app is designed to help you manage your personal finances efficiently. Below are the key features and instructions on how to use them effectively.</p>
            <div className="eight">
                <h1>Dashboard Overview</h1>
            </div>
            <p>The dashboard provides an overview of your financial status, including your current balance, income, expenses, and a summary of recent transactions.</p>
            Transactions
            Transactions: This section allows you to view, add, edit, and delete transactions.
            Add Transaction: Click on the "Add Transaction" button to record a new transaction. Enter the amount, category (income or expense), date, and description.
            Edit Transaction: Edit existing transactions by clicking on the "Edit" button next to each transaction.
            Delete Transaction: Remove unwanted transactions by clicking on the "Delete" button.
            Categories and Budgeting
            Categories: Categorize your transactions to track spending habits. Common categories include food, utilities, entertainment, etc.
            Budgeting: Set monthly budgets for different categories to help manage your spending effectively.
            Reports and Analytics
            Reports: Generate detailed reports and analytics to gain insights into your financial habits.
            Pie Chart: Visualize your spending distribution using a pie chart to see where your money goes.
            Bar Chart: Track income versus expenses over time with a bar chart representation.
            Notifications and Reminders
            Notifications: Receive notifications for upcoming bill payments, budget limits, or financial milestones.
            Reminders: Set reminders for important financial tasks such as bill payments, savings goals, etc.
            Profile and Settings
            Profile: Manage your profile information, including personal details, financial goals, and preferences.
            Settings: Customize app settings such as currency format, language, notifications, etc.
        </div>
    );
};

export default Instructions;