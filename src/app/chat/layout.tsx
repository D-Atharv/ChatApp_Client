import Navbar from "./components/Navbar";
import ProfileCards from "./components/ProfileCards";

export default function ChatHome() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />
            <div className="flex-1 flex py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full flex justify-center">
                    <ProfileCards />
                </div>
            </div>
        </div>
    );
}

