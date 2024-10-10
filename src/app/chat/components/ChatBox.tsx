'use client';

import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuthContext } from '../../../context/AuthContext';
import { fetchMessages } from '../../../server/fetchMessage';
import back from '../../../../styles/svg/arrow_left.svg';
import Image from 'next/image';

interface Message {
  id: string;
  content: string;
  senderId: string;
  groupId: string;
  createdAt: string;
}

interface ChatBoxProps {
  groupId: string;
  groupName: string;
  onBackClick?: () => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ groupId, groupName, onBackClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { authUser } = useAuthContext();
  const socket = useRef<any>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io('http://localhost:3000');
    }

    socket.current.emit('join_group', groupId);

    const handleReceiveMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    socket.current.on('receive_message', handleReceiveMessage);

    const fetchAndSetMessages = async () => {
      try {
        setLoading(true);
        const fetchedMessages = await fetchMessages(groupId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    fetchAndSetMessages();

    return () => {
      socket.current.emit('leave_group', groupId);
      socket.current.off('receive_message', handleReceiveMessage);
    };
  }, [groupId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || isSending) return;

    setIsSending(true);

    const newMessageObj: Message = {
      id: crypto.randomUUID(),
      content: newMessage,
      senderId: authUser.id,
      groupId,
      createdAt: new Date().toISOString(),
    };

    socket.current.emit('send_message', newMessageObj);

    setNewMessage('');
    textareaRef.current!.style.height = 'auto';

    setTimeout(() => setIsSending(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className="flex-1 relative bg-gray-700 bg-blue-gradient rounded-xl border border-gray-200"
      style={{ height: 'calc(100vh - 8em)', paddingBottom: '20px' }}
    >
      <header className="bg-gray-900 p-4 text-gray-400 rounded-xl rounded-b-none">
        <div className="w-full h-12 rounded-full overflow-hidden flex justify-start items-center">
          {onBackClick && (
            <button
              className="text-white text-[1.4em] font-bold sm:hidden"
              onClick={onBackClick}
            >
              <Image src={back} alt="back" width={28} height={28} />
            </button>
          )}
          <h1 className="text-2xl ml-4 font-semibold">{groupName}</h1>
        </div>
      </header>

      <div className="overflow-y-auto p-4 h-[calc(100vh-20rem)] scrollbar-hide">
        {loading ? (
          <p className="text-gray-400">Loading messages...</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.senderId === authUser.id ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`break-words w-auto max-w-full sm:max-w-xs md:max-w-[16em] between_custom:max-w-[12rem] lg:max-w-md xl:max-w-lg ${message.senderId === authUser.id
                    ? 'bg-indigo-500'
                    : 'bg-gray-800'
                  } font-semibold text-white rounded-xl p-3`}
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              >
                <p>{message.content}</p>
              </div>
            </div>



          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 pt-6 pb-4 flex flex-col items-center space-x-4 rounded-b-xl">
        <div className="w-full flex items-center space-x-4 px-4">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-3 rounded-xl bg-gray-800 text-white outline-none resize-none overflow-y-auto max-h-32"
            rows={1}
            onKeyDown={handleKeyDown}
            style={{ lineHeight: '1.5' }}
          />
          <button
            onClick={handleSendMessage}
            className={`p-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 ${isSending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isSending}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
