'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    authUser: any;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>({
    authUser: null,
	setAuthUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const response = await fetch('/api/user/me');
                const data = await response.json();

                console.log(data);
                if (!response.ok) {
                    throw new Error(data.error);
                }
                setAuthUser(data);

            } catch (error) {
                console.log(error);
                console.log("error fetching auth user");
            }
        }
        fetchAuthUser();
    },[])

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
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
