'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { ChatBox } from "./components/ChatBox";
import { Navbar } from "./components/Navbar";
import { ProfileCards } from "./components/ProfileCards";

export default function ChatHome() {

    const { authUser } = useAuthContext();
    const router = useRouter();
    const [selectedGroup, setSelectedGroup] = useState<{ groupId: string, groupName: string } | null>(null); 

    useEffect(() => {
        if (!authUser) {
            router.push('/login');
        }
    }, [authUser, router]);

    if (!authUser) {
        return <h1>Not authenticated</h1>;
    }
     const handleSelectGroup = (groupId: string, groupName: string) => {
        setSelectedGroup({ groupId, groupName });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col ">
            <Navbar />
            <div className="py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="flex justify-between">
                    <ProfileCards onSelectGroup={handleSelectGroup} />

                    <div className="hidden sm:flex sm:flex-auto md:flex-1 lg:flex-1 ml-6">
                        {selectedGroup ? (
                            <ChatBox groupId={selectedGroup.groupId} groupName={selectedGroup.groupName} />

                        ) : (
                            <div className="flex justify-center items-center flex-1 relative bg-gray-700 rounded-xl">
                                <p className="text-gray-200 font-bold text-[2em] text-lg">Welcome {authUser.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}