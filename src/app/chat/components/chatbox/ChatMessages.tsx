'use client';

import React, { useEffect, useRef } from 'react';
import { Message } from './ChatBox';
import { useAuthContext } from '@/context/AuthContext';

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  groupId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, loading  }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="overflow-y-auto p-4 h-[calc(100vh-20rem)] scrollbar-hide">
      {loading ? (
        <p className="text-gray-400">Loading messages...</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.senderId === authUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`break-words w-auto max-w-full sm:max-w-xs md:max-w-[16em] between_custom:max-w-[12rem] lg:max-w-md xl:max-w-lg ${
                message.senderId === authUser.id ? 'bg-indigo-500' : 'bg-gray-800'
              } font-semibold text-white rounded-xl p-3`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
