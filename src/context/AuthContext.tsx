'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    authUser: any;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            console.log("Error fetching auth user", error);
            setAuthUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthUser(); 
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
            {children}
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
