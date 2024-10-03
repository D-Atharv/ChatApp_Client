import { useAuthContext } from "@/context/AuthContext";

export const useLogin = () => {
    const { setAuthUser } = useAuthContext();

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'login failed');
            }
            setAuthUser(data);
        } catch (error: any) {
            console.error('Login Error:', error.message);
            throw error;
        }
    };

    return { login };
};
