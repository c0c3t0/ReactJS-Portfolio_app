import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const authService = authServiceFactory(auth.accessToken)

    const onLoginSubmit = async (data) => {
        const result = await authService.login(data);
        setAuth(result);
        navigate('/');
    };

    const onRegisterSubmit = async (data) => {
        if (!data.email || !data.password || !data.rePass) {
            alert('All fields are required!');
            return;
        };
        if (data.password !== data.rePass) {
            alert('Passwords don\'t match!');
            return;
        };

        const result = await authService.register(data);
        setAuth(result);
        navigate('/');
    };

    const onLogout = async () => {
        await authService.logout();
        setAuth({});
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};