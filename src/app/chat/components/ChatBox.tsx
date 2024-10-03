'use client'

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import eye from '../../../../styles/svg/eye-solid.svg';

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { senderId: 1, content: 'Hello' },
        { senderId: 2, content: 'Hi' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const currentUserID = 10;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null); // Ref for the messages container
    const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for the textarea
    const [previousHeight, setPreviousHeight] = useState(0); // Track previous height of textarea

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return; // Prevent empty messages

        const message = {
            senderId: currentUserID,
            content: newMessage,
        };

        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height after sending a message
            setPreviousHeight(0); // Reset the height tracking
        }

        // Scroll to the bottom of the messages after sending
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);

        // Adjust the height of the textarea dynamically
        if (textareaRef.current) {
            const previousScrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = 'auto'; // Reset the height
            const newScrollHeight = textareaRef.current.scrollHeight;

            // Set the textarea height based on its scroll height
            textareaRef.current.style.height = `${newScrollHeight}px`; 

            // Scroll the messages container to keep the last message visible
            if (messagesContainerRef.current) {
                const heightDifference = newScrollHeight - previousScrollHeight;

                // Adjust the scroll position of the messages container
                messagesContainerRef.current.scrollTop += heightDifference;
            }

            // Update the previous height for the next resize
            setPreviousHeight(newScrollHeight);
        }
    };

    // Auto scroll to the bottom whenever messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 relative ml-6 bg-gray-700 rounded-xl">
            {/* Chat header */}
            <header className="bg-gray-900 p-4 text-gray-400 rounded-xl rounded-b-none">
                <div className="w-full h-12 rounded-full overflow-hidden mr-4 flex justify-start items-center">
                    <Image src={eye} alt="User Avatar" width={48} height={48} className="object-cover" />
                    <h1 className="text-2xl ml-4 font-semibold">Chat</h1>
                </div>
            </header>

            {/* Fixed height messages container with scrolling */}
            <div ref={messagesContainerRef} className="overflow-y-auto p-4 h-[calc(100vh-16rem)] scrollbar-hide pb-32">
                {messages.map((message, index) => (
                    <div key={index} className={`flex mb-4 ${message.senderId === currentUserID ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[40%] break-words ${message.senderId === currentUserID ? 'bg-indigo-500' : 'bg-gray-800'} font-semibold text-white rounded-xl p-3`}
                        >
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Send message input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 flex items-center rounded-b-xl space-x-4">
                <textarea
                    ref={textareaRef} // Ref for the textarea
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Type a message"
                    className="flex-1 p-3 rounded-xl bg-gray-800 text-white outline-none resize-none overflow-y-auto max-h-32"
                    rows={1} // Start with 1 row
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    style={{ lineHeight: '1.5' }}
                />
                <button
                    onClick={handleSendMessage}
                    className="p-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
