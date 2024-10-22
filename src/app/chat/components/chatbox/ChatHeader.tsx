'use client';

import React from 'react';
import Image from 'next/image';
import back from '../../../../../styles/svg/arrow_left.svg';

interface ChatHeaderProps {
  groupName: string;
  onBackClick?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ groupName, onBackClick }) => (
  <header className="bg-gray-900 p-4 text-gray-400 rounded-xl rounded-b-none">
    <div className="w-full h-12 rounded-full overflow-hidden flex justify-start items-center">
      {onBackClick && (
        <button className="text-white text-[1.4em] font-bold sm:hidden" onClick={onBackClick}>
          <Image src={back} alt="back" width={28} height={28} />
        </button>
      )}
      <h1 className="text-2xl ml-4 font-semibold">{groupName}</h1>
    </div>
  </header>
);