'use client';

import React, { useRef } from 'react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  isSending: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, handleSendMessage, isSending }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
          className={`p-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSending}
        >
          Send
        </button>
      </div>
    </div>
  );
};
