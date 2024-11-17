import React from 'react';
import Image from 'next/image';
import { User } from '../../../../../types/allTypes';

interface UserProfileProps {
  user: User;
  onImageClick: (imageUrl: string | null, initials: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onImageClick }) => {
  const getUserInitials = (name: string) => {
    const [firstName = '', lastName = ''] = name.split(' ');
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className='flex items-center justify-center my-10'>
      <div className="m-10 max-w-sm rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg text-center w-full">
        <div 
          className="relative mx-auto w-36 h-36 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={() => onImageClick(user.image, getUserInitials(user.name))}
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={120}
              height={120}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-600">
              <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                {getUserInitials(user.name)}
              </span>
            </div>
          )}
          <span className="absolute right-2 bottom-2 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
        </div>
        <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">{user.name}</h1>
        <p className="text-sm leading-6 text-gray-500 hover:text-gray-600">Short bio or description goes here.</p>
        <ul className="mt-3 divide-y divide-gray-300 rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <li className="flex items-center py-3 text-sm">
            <span>Email</span>
            <span className="ml-auto">
              <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{user.email}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};