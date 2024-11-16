'use client';

import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuthContext } from '../../../../context/AuthContext';
import { fetchMessages } from "../../../../../services/fetchMessage"
import { ChatMessages } from './ChatMessages';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatBoxProps, Message } from '../../../../../types/allTypes';

const notificationSound = '/sounds/notification.mp3';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000');

export const ChatBox: React.FC<ChatBoxProps> = ({ groupId, groupName, onBackClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [lastPlayedTime, setLastPlayedTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    setMessages([]);
    setLoading(true);

    socket.emit('join_group', groupId);

    const fetchAndSetMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages(groupId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetMessages();

    return () => {
      socket.emit('leave_group', groupId);
      socket.off('receive_message');
    };
  }, [groupId]);

  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
      if (message.groupId === groupId) {
        setMessages((prevMessages) => [...prevMessages, message]);

        const currentTime = new Date().getTime();
        const fiveMinutesInMs = 5 * 60 * 1000;

        if (currentTime - lastPlayedTime >= fiveMinutesInMs) {
          if (message.senderId !== authUser.id && audioRef.current) {
            audioRef.current.play();
            setLastPlayedTime(currentTime);
          }
        }
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [groupId, lastPlayedTime, authUser.id]);

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

    socket.emit('send_message', newMessageObj);

    setNewMessage('');
    setTimeout(() => setIsSending(false), 500);
  };

  return (
    <div
      className="flex-1 relative bg-gray-700 bg-blue-gradient rounded-xl border border-gray-200"
      style={{ height: 'calc(100vh - 8em)', paddingBottom: '20px' }}
    >
      <ChatHeader groupName={groupName} onBackClick={onBackClick} />

      <ChatMessages messages={messages} loading={loading} groupId={groupId} />

      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        isSending={isSending}
      />

      <audio ref={audioRef} src={notificationSound} preload="auto" />
    </div>
  );
};
