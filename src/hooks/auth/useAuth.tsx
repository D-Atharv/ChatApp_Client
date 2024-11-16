import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const { authUser } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!authUser) {
            router.push("/login");
        }
    }, [authUser, router]);

    return authUser;
};
