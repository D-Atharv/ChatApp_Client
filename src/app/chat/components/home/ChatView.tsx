import { ChatBox } from "@/app/chat/components/chatbox/ChatBox";
import { ProfileCards } from "@/app/chat/components/profileCards/ProfileCards";
import { WelcomeMessage } from "./WelcomeMessage";
import { ChatViewProps } from "../../../../../types/allTypes";
export const ChatView = ({
    isSmallScreen,
    showChatOnSmallScreen,
    selectedGroup,
    onSelectGroup,
    onBackClick,
    userName,
}: ChatViewProps) => {
    if (isSmallScreen) {
        return showChatOnSmallScreen ? (
            <div className="w-full">
                {selectedGroup && (
                    <ChatBox
                        groupId={selectedGroup.groupId}
                        groupName={selectedGroup.groupName}
                        onBackClick={onBackClick}
                    />
                )}
            </div>
        ) : (
            <ProfileCards onSelectGroup={onSelectGroup} />
        );
    }

    return (
        <div className="flex w-full">
            <div className="w-[30%]">
                <ProfileCards onSelectGroup={onSelectGroup} />
            </div>
            <div className="w-[70%] pl-8">
                {selectedGroup ? (
                    <ChatBox
                        groupId={selectedGroup.groupId}
                        groupName={selectedGroup.groupName}
                    />
                ) : (
                    <div className="flex justify-center items-center h-full bg-gray-700 bg-blue-gradient rounded-xl border border-gray-200">
                        <WelcomeMessage userName={userName || "User"} />
                    </div>
                )}
            </div>
        </div>
    );
};
