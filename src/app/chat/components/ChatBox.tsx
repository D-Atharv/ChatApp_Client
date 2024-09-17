'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import eye from '../../../../styles/svg/eye-solid.svg';
import bars from '../../../../styles/svg/bars.svg';

// JSON array with mock messages
const mockMessages = [
    'Hi there!',
    'How are you doing?',
    'Are you coming to the meeting later?',
    'Don’t forget to bring the documents.',
    'Talk to you later!',
    'This is a very long message just to test the word wrap and ensure that it doesn’t overflow outside of its container. The message should break onto a new line if it exceeds the container’s width and continue inside the message box.'
];

// Chat Component
export default function ChatBox() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ msg: string; isSender: boolean }[]>([]); // Add a flag to track sender/receiver
    const [incomingIndex, setIncomingIndex] = useState(0); // To track the next message to receive
    const messagesEndRef = useRef<null | HTMLDivElement>(null); // Ref to scroll to the end

    // Handle menu toggle
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Handle message input change
    const handleMessageChange = (e: any) => {
        setMessage(e.target.value);
    };

    // Send message function
    const sendMessage = () => {
        if (message.trim()) {
            // Add the new message as a sender message
            setMessages((prevMessages) => [...prevMessages, { msg: message, isSender: true }]);
            setMessage(''); // Reset the input
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // Simulate receiving a message from the mock JSON array
    useEffect(() => {
        if (incomingIndex < mockMessages.length) {
            const receiveMessage = () => {
                // Simulate an incoming message as a receiver message
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { msg: mockMessages[incomingIndex], isSender: false },
                ]);
                setIncomingIndex((prevIndex) => prevIndex + 1); // Move to the next message
            };

            const interval = setInterval(receiveMessage, 3000); // Receive a message every 3 seconds
            return () => clearInterval(interval); // Clear the interval when component unmounts
        }
    }, [incomingIndex]);

    // Scroll to the bottom of the messages container whenever messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

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
            <div className="overflow-y-auto p-4 pb-36 h-[calc(100vh-16rem)] scrollbar-hide">
                {/* Dynamically Render Messages */}
                {messages.map((messageData, index) => (
                    <div
                        key={index}
                        className={`flex mb-4 cursor-pointer ${messageData.isSender ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        {!messageData.isSender && ( // For receiver's message, image should be on the left
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                <Image
                                    src={eye}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        )}
                        <div
                            className={`flex max-w-[42%] break-words ${messageData.isSender ? 'bg-indigo-500' : 'bg-gray-800'
                                } font-semibold text-black rounded-xl p-3 gap-3`}
                            style={{ wordBreak: 'break-word' }} // Ensure long words break properly
                        >
                            <p>{messageData.msg}</p>
                        </div>
                        {messageData.isSender && ( // For sender's message, image stays on the right
                            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                <Image
                                    src={eye}
                                    alt="My Avatar"
                                    className="w-8 h-8 rounded-full"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Reference to the end of the messages */}
            </div>

            {/* Chat Input */}
            <footer className="bg-gray-900 text-gray-900 border-gray-300 p-4 absolute bottom-0 w-full rounded-xl rounded-t-none">
                <div className="flex items-center">
                    <textarea
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-xl !text-black border border-gray-400 font-semibold focus:outline-none focus:border-blue-500 resize-none overflow-y-auto"
                        value={message}
                        onChange={(e) => {
                            handleMessageChange(e);
                            e.target.style.height = "auto"; // Reset height before measuring
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`; // Dynamically adjust height
                        }}
                        onKeyDown={handleKeyPress}
                        rows={1} // Initial row size
                        style={{ maxHeight: '120px', height: 'auto' }} // Limit height to 10px
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
                <button id="menuButton" onClick={toggleMenu} className="p-2 rounded-md text-white">
                    <Image src={bars} alt="Menu Icon" width={24} height={24} />
                </button>

                {/* Toggle Menu Dropdown */}
                {menuVisible && (
                    <div
                        id="menuDropdown"
                        className="absolute top-full right-0 mt-2 w-40 text-gray-300 bg-gray-950 shadow-md p-4 rounded-md"
                    >
                        <p>Block Alice</p>
                    </div>
                )}
            </div>
        </div>
    );
}
