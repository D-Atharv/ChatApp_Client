'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import eye from '../../../../styles/svg/eye-solid.svg';
import { useAuthContext } from '@/context/AuthContext';

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
}

export const ChatBox: React.FC<ChatBoxProps> = ({ groupId, groupName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/message/groups/${groupId}/allMessages`);
        const data = await response.json();

        if (data.response === 'success') {
          setMessages(data.data);
        } else {
          console.error('Failed to fetch messages:', data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [groupId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return; 

    const newMessageObj: Message = {
      id: crypto.randomUUID(), 
      content: newMessage,
      senderId: authUser.id,
      groupId,
      createdAt: new Date().toISOString(),
    };

    // Optimistically add the new message to the messages list
    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessage(''); 

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch(`/api/message/groups/${groupId}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessageObj.content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send the message');
      }

      const data = await response.json();
      console.log('Message sent:', data);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessageObj.id
            ? { ...msg, id: data.data.message.id, createdAt: data.data.message.createdAt }
            : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Scroll to the bottom of the messages after sending
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 relative bg-gray-700 rounded-xl">
      <header className="bg-gray-900 p-4 text-gray-400 rounded-xl rounded-b-none">
        <div className="w-full h-12 rounded-full overflow-hidden flex justify-start items-center">
        <h1 className='pr-5 text-[1.4em] font-bold'>Back</h1>   
          <Image src={eye} alt="User Avatar" width={48} height={48} className="object-cover" />
          <h1 className="text-2xl ml-4 font-semibold">{groupName}</h1> 
        </div>
      </header>

      <div ref={messagesContainerRef} className="overflow-y-auto p-4 h-[calc(100vh-20rem)] scrollbar-hide">
        {loading ? (
          <p className="text-gray-400">Loading messages...</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.senderId === authUser.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[40%] break-words ${message.senderId === authUser.id ? 'bg-indigo-500' : 'bg-gray-800'} font-semibold text-white rounded-xl p-3`}>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={{ lineHeight: '1.5' }}
          />
          <button onClick={handleSendMessage} className="p-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
