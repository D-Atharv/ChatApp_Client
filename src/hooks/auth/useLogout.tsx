import { useAuthContext } from "@/context/AuthContext";

export const useLogOut = () => {

    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/logout", {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setAuthUser(null);
            } else {
                throw new Error("Failed to logout");
            }
        } catch (error: any) {
            console.error('Logout Error:', error.message);
            throw error;
        }
    }
    return logout;
}