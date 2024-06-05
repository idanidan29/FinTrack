import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
    // Define the response callback function for successful login
    const handleSuccess = (response) => {
        console.log('Google login successful:', response);
        // Call the onSuccess callback function provided by the parent component
        onSuccess(response);
    };

    // Define the response callback function for failed login
    const handleFailure = (error) => {
        console.error('Google login failed:', error);
        // Call the onFailure callback function provided by the parent component
        onFailure(error);
    };

    return (
        <GoogleLogin
            clientId="YOUR_CLIENT_ID.apps.googleusercontent.com" // Your Google OAuth client ID
            buttonText="Login with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
        // Add any additional props or styling here
        />
    );
};

export default GoogleLoginButton;
