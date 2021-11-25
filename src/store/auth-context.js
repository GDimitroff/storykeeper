import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    return expirationTime - Date.now();
};

const retrieveStoredToken = () => {
    const sharedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    const userId = localStorage.getItem('userId');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userId');
        return null;
    }

    return {
        token: sharedToken,
        duration: remainingTime,
        userId: userId,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    let initialToken;
    let initialUserId;
    if (tokenData) {
        initialToken = tokenData.token;
        initialUserId = tokenData.userId;
    }

    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialUserId);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime, userId) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId', userId);

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
