'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // For redirecting
import { useAuthContext } from '@/context/AuthContext'; // Use auth context
import ChatBox from "./components/ChatBox";
import Navbar from "./components/Navbar";
import ProfileCards from "./components/ProfileCards";

// This must be the default export in your page file
export default function ChatHome() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    
    const { authUser } = useAuthContext(); // Get the current authenticated user
    const router = useRouter(); // Use router to redirect if not authenticated

    // Check if user is authenticated
    useEffect(() => {
        if (!authUser) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [authUser, router]);

    // If user is not authenticated, do not render the component
    if (!authUser) {
        return null;
    }

    // Function to handle selecting a user
    const handleSelectedUser = (user: string) => {
        setSelectedUser(user);
    }

    // Render the chat page when user is authenticated
    return (
        <div className="min-h-screen bg-black flex flex-col ">
            <Navbar />
            <div className="py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="flex justify-between">
                    <ProfileCards onSelectUser={handleSelectedUser} />

                    <div className="hidden sm:flex sm:flex-auto md:flex-1 lg:flex-1 ml-6">
                        {selectedUser ? (
                            <ChatBox selectedUser={selectedUser} />
                        ) : (
                            <div className="text-gray-400 text-center p-8">
                                <p>Select a conversation to start chatting.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
