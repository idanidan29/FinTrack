import './App.css';
import Dashboard from './components/Dashboard';
import ToolBar from './components/ToolBar';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Profile from './components/Profile';
import Transactions from './components/Transactions';
import History from './components/History';
import Instructions from './components/Instructions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/Register" element={<RegisterScreen />} />
                    <Route path="/Dashboard/:data" element={<div><ToolBar /><Dashboard /></div>} />
                    <Route path="/Profile/:data" element={<div><ToolBar /><Profile /></div>} />
                    <Route path="/Transactions/:data" element={<div><ToolBar /><Transactions /></div>} />
                    <Route path="/History/:data" element={<div><ToolBar /><History /></div>} />
                    <Route path="/Instructions/:data" element={<div><ToolBar /><Instructions /></div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
