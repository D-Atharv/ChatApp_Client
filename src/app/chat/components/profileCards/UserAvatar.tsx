import React from 'react';
import Image from 'next/image';
import { UserAvatarProps } from '../../../../../types/allTypes';

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, showStatus = true, onImageClick }) => {
  const getUserInitials = (name: string) => {
    const [firstName = '', lastName = ''] = name.split(' ');
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="relative flex-shrink-0">
      <div
        className="cursor-pointer"
        onClick={() => onImageClick(user.image, getUserInitials(user.name))}
      >
        {user.image ? (
          <Image
            className="w-10 h-10 rounded-full"
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
          />
        ) : (
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {getUserInitials(user.name)}
            </span>
          </div>
        )}
      </div>
      {showStatus && (
        <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
      )}
    </div>
  );
};