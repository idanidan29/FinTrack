import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:5073/Users', {
                params: {
                    username,
                    password
                }
            });
            if (response.status === 200 && response.data) {

                window.location.href = `/dashboard/${response.data.userName}`;
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            alert('An error occurred while logging in. Please try again later.');
        }
    };
    return (
        <div>
            <div className="HeadTitle">
                <h1>WELCOME<span>login to your user</span></h1>
            </div>
            <div className="nice_form">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="username"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder="password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <h3></h3>
                <GoogleLoginButton></GoogleLoginButton>
                <h3></h3>
                <button type="submit">LOG IN</button>
                <h1></h1>
                <Link to="/Register">
                    <button>I dont have a user</button>
                </Link>
               
                </form>
            </div>
        </div>
    );
};
export default LoginScreen;
