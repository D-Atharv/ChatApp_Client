'use client';

import { useState } from "react";
import { Navbar } from "./components/navbar/Navbar";
import Loader from "@/components/ui/animation/LoadingSpinner";
import { ChatView } from "@/app/chat/components/home/ChatView";
import { useAuth } from "@/hooks/auth/useAuth";
import { useResponsive } from "@/hooks/useResponsive";

export default function ChatHome() {
    const authUser = useAuth();
    const isSmallScreen = useResponsive();
    const [selectedGroup, setSelectedGroup] = useState<{ groupId: string; groupName: string } | null>(null);
    const [showChatOnSmallScreen, setShowChatOnSmallScreen] = useState(false);

    if (!authUser) return <Loader />;

    const handleSelectGroup = (groupId: string, groupName: string) => {
        setSelectedGroup({ groupId, groupName });
        if (isSmallScreen) setShowChatOnSmallScreen(true);
    };

    const handleBackClick = () => setShowChatOnSmallScreen(false);

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />
            <div className="py-4 px-4 sm:px-6 lg:px-8 overflow-hidden flex-1">
                <ChatView
                    isSmallScreen={isSmallScreen}
                    showChatOnSmallScreen={showChatOnSmallScreen}
                    selectedGroup={selectedGroup}
                    onSelectGroup={handleSelectGroup}
                    onBackClick={handleBackClick}
                    userName={authUser.name} 
                />
            </div>
        </div>
    );
}