import { useAuthContext } from "@/context/AuthContext";

export const useSignIn = () => {

    const { setAuthUser } = useAuthContext();

    const signIn = async (name: string, email: string, password: string) => {

        try {
            const response = await fetch('/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'signIn failed');
            }
            setAuthUser(null);
        }
        catch (error: any) {
            console.error('Signin Error:', error.message);
            throw error;
        }
    }

    return {signIn};
}