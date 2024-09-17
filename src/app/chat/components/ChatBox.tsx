'use client'

import { useState } from 'react';
import Image from 'next/image';
import eye from '../../../../styles/svg/eye-solid.svg';

// Chat Component
export default function ChatBox() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [message, setMessage] = useState('');

    // Handle menu toggle
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Handle message input change
    const handleMessageChange = (e: any) => {
        setMessage(e.target.value);
    };

    // Send message function (for now, it just clears the input)
    const sendMessage = () => {
        // You can handle sending message here
        setMessage(''); // Reset the input
    };

    return (
        <div className="flex-1 relative ml-6 bg-gray-700 rounded-xl">
            {/* Chat Header */}
            <header className="bg-gray-900 p-4 text-gray-400 rounded-xl rounded-b-none">
                <div className="w-full h-12 rounded-full overflow-hidden mr-4 flex justify-start items-center">
                    <Image
                        src={eye}  
                        alt="User Avatar"
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                <h1 className="text-2xl ml-4 font-semibold">Alice</h1>
                </div>
            </header>

            {/* Chat Messages */}
            <div className="overflow-y-auto p-4 pb-36 ">
                {/* Example Messages */}
                <div className="flex mb-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <Image
                            src={eye}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div className="flex max-w-96 bg-white text-black font-semibold  rounded-xl p-3 gap-3">
                        <p className="text-gray-700">Hey Bob, how's it going?</p>
                    </div>
                </div>
                {/* Add more message components here */}
                {/* Outgoing Message */}
                <div className="flex justify-end mb-4 cursor-pointer">
                    <div className="flex max-w-96 bg-indigo-500 font-semibold text-black rounded-xl p-3 gap-3">
                        <p>Absolutely! Can't wait for our pizza date. 🍕</p>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <Image
                            src={eye}
                            alt="My Avatar"
                            className="w-8 h-8 rounded-full"
                            width={32}
                            height={32}
                        />
                    </div>
                </div>
            </div>

            {/* Chat Input */}
            <footer className="bg-gray-900 text-gray-900 border-gray-300 p-4 absolute bottom-0 w-full rounded-xl rounded-t-none">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-xl !text-black border border-gray-400 font-semibold focus:outline-none focus:border-blue-500 "
                        value={message}
                        onChange={handleMessageChange}
                        style={{ color: 'black !important' }}  // Force black color using inline styles
                    />
                    <button
                        className="bg-indigo-500 px-4 py-2 text-black font-semibold rounded-xl ml-2"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </footer>



            {/* Toggle Menu Example */}
            <div className="absolute top-4 right-4">
                <button id="menuButton" onClick={toggleMenu} className="bg-blue-500 p-2 rounded-md text-white">
                    Toggle Menu
                </button>
                {menuVisible && (
                    <div id="menuDropdown" className="bg-white shadow-md p-4 mt-2 rounded-md">
                        <p>Menu Item 1</p>
                        <p>Menu Item 2</p>
                    </div>
                )}
            </div>
        </div>
    );
}
