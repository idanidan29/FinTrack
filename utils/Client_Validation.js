export const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!password) {
        return 'Password is required';
    }
    if (!passwordRegex.test(password)) {
        return 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character';
    }
    return null; // Return null if validation passes
};
export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!username) {
        return 'Username is required';
    }
    if (!usernameRegex.test(username)) {
        return 'Username can only contain letters, numbers, and underscores (3-20 characters)';
    }
    return null; // Return null if validation passes
};

export const validatePersonalName = (name) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!name) {
        return 'Name is required';
    }
    if (!nameRegex.test(name)) {
        return 'Name can only contain letters and spaces';
    }
    return null; // Return null if validation passes
};


