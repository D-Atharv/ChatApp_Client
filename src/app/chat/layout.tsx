import ChatBox from "./components/ChatBox";
import Navbar from "./components/Navbar";
import ProfileCards from "./components/ProfileCards";

export default function ChatHome() {
    return (
        <div className="min-h-screen bg-black flex flex-col ">
            <Navbar />
            <div className="py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="flex justify-between">
                    <ProfileCards />
                    {/* Hide ChatBox until lg, then show it */}
                    {/* <div className="hidden md:flex lg:flex-1 ml-6"> */}
                    <div className="hidden sm:flex md:flex-auto lg:flex-1 ml-6">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>
    );
}
