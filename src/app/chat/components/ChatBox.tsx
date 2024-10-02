'use client'

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import eye from '../../../../styles/svg/eye-solid.svg';


const ChatBox = () => {
    
const [messages, setMessages] = useState([
    { senderId: 1, content: 'Hello' },
    { senderId: 2, content: 'Hi' },
  ]);

  const currentUserID = 10;
  const messagesEndRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="flex-1 relative ml-6 bg-gray-700 rounded-xl">
            <header className="bg-gray-900 p-4 text-gray-400 rounded-xl rounded-b-none">
                <div className="w-full h-12 rounded-full overflow-hidden mr-4 flex justify-start items-center">
                    <Image src={eye} alt="User Avatar" width={48} height={48} className="object-cover" />
                    <h1 className="text-2xl ml-4 font-semibold">Chat</h1>
                </div>
            </header>

            <div className="overflow-y-auto p-4 pb-36 h-[calc(100vh-16rem)] scrollbar-hide">
                {messages.map((message, index) => (
                    <div key={index} className={`flex mb-4 ${message.senderId === currentUserID ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[42%] break-words ${message.senderId === currentUserID ? 'bg-indigo-500' : 'bg-gray-800'} font-semibold text-white rounded-xl p-3`}>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default ChatBox;
