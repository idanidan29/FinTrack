import axios from 'axios';
import { useState } from 'react';
import { validatePassword, validatePersonalName, validateUsername } from '../utils/Client_Validation'; 
import { Link } from 'react-router-dom';

const EnteringScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [Success, setSuccess] = useState(null);
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate inputs
        const nameError = validatePersonalName(name);
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);

        if (nameError || usernameError || passwordError) {
            setError(nameError || usernameError || passwordError);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5073/Users', {
                name,
                username,
                password
            });

            // Check if registration was successful
            if (response.status === 201) {
                // Reset fields and error state after successful registration
                setName('');
                setUsername('');
                setPassword('');
                setError(null);
                setSuccess('User registered successfully!');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response.status === 409)
                setError('Username or password is already taken. Please choose a different one.');
            else
                setError('An error occurred during registration');
        }
    };


    return (
        <div>
            <div className="HeadTitle">
                <h1>WELCOME<span>LETS CREATE A NEW USER</span></h1>
            </div>
            <div className="nice_form">
            {error && <div>{error}</div>}
            {Success && <div>{Success}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">register</button>
                <h1></h1>
                <Link to="/">
                    <button>I already have a user</button>
                </Link>
                </form>
            </div>
        </div>
    );
};

export default EnteringScreen;
