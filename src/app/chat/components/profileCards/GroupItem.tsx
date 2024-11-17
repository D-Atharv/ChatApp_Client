import React from 'react';
import { Reorder } from 'framer-motion';
import { UserAvatar } from './UserAvatar';
import { GroupItemProps } from '../../../../../types/allTypes';

export const GroupItem: React.FC<GroupItemProps> = ({
  group,
  isSelected,
  onSelect,
  onImageClick
}) => {
  const mainUser = group.users[0];
  
  return (
    <Reorder.Item value={group}>
      <li 
        className={`py-4 px-2 rounded-sm cursor-pointer hover:bg-sky-950 ${
          isSelected ? 'bg-neutral-800' : ''
        }`}
        onClick={(event) => onSelect(group, event)}
      >
        <div className="flex items-center rounded-xl">
          {mainUser && (
            <UserAvatar
              user={mainUser}
              onImageClick={onImageClick}
            />
          )}
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-lg font-semibold text-gray-200 truncate">
              {group.isGroupChat ? 'Group Chat' : mainUser?.name || 'Unnamed Group'}
            </p>
            <p className="text-sm font-medium text-gray-200 truncate">
              Users: {group.users.map((u) => u.name).join(', ') || 'No users available'}
            </p>
          </div>
        </div>
      </li>
    </Reorder.Item>
  );
};