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
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const [showChatOnSmallScreen, setShowChatOnSmallScreen] = useState<boolean>(false);

    useEffect(() => {
        if (!authUser) {
            router.push('/login');
        }
    }, [authUser, router]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 639);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!authUser) {
        return <h1>Not authenticated</h1>;
    }

    const handleSelectGroup = (groupId: string, groupName: string) => {
        setSelectedGroup({ groupId, groupName });
        if (isSmallScreen) {
            setShowChatOnSmallScreen(true);
        }
    };

    const handleBackClick = () => {
        setShowChatOnSmallScreen(false);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="py-4 px-4 sm:px-6 lg:px-8 overflow-hidden flex-1">
                <div className="flex justify-between">
                    {isSmallScreen ? (
                        showChatOnSmallScreen ? (
                            <div className="w-full">
                                {selectedGroup && (
                                    <ChatBox
                                        groupId={selectedGroup.groupId}
                                        groupName={selectedGroup.groupName}
                                        onBackClick={handleBackClick}
                                    />
                                )}
                            </div>
                        ) : (
                            <ProfileCards onSelectGroup={handleSelectGroup} />
                        )
                    ) : (
                        <div className="flex w-full">
                            <div className="w-[30%]">
                                <ProfileCards onSelectGroup={handleSelectGroup} />
                            </div>

                            <div className="w-[70%] pl-8 ">
                                {selectedGroup ? (
                                    <ChatBox groupId={selectedGroup.groupId} groupName={selectedGroup.groupName} />
                                ) : (
                                    <div className="flex justify-center items-center h-full bg-gray-700 bg-blue-gradient rounded-xl border border-gray-200 ">
                                        <p className="text-gray-200 font-bold text-[2.2em]">Welcome {authUser.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
