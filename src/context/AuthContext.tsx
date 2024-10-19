'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../components/ui/animation/LoadingSpinner';

interface AuthContextType {
    authUser: any;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);

    const fetchAuthUser = async () => {
        try {
            const response = await fetch('/api/user/me', {
                credentials: 'include',
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }
            setAuthUser(data);
        } catch (error) {
            console.error("Error fetching auth user", error);
            setAuthUser(null);
        } finally {
            setShowLoader(true);
            setTimeout(() => {
                setIsLoading(false);
                setShowLoader(false);
            },600);
        }
    };

    useEffect(() => {
        fetchAuthUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
            {showLoader || isLoading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};