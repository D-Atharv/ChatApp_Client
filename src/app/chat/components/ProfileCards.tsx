'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import favicon from '../../../../styles/svg/favicon.ico';
import { fetchGroups } from '../../../server/fetchGroup';

interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
}

interface Group {
  id: string;
  isGroupChat: boolean;
  users: User[];
}

interface ProfileCardsProps {
  onSelectGroup: (groupId: string, groupName: string) => void;
}

export const ProfileCards = ({ onSelectGroup }: ProfileCardsProps) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetGroups = async () => {
      try {
        const fetchedGroups = await fetchGroups();
        setGroups(fetchedGroups);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetGroups();
  }, []);

  if (loading) {
    return <p className="text-white">Loading groups...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      className="relative w-full h-full p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow border border-gray-200 overflow-y-auto bg-blue-gradient"
      style={{ height: 'calc(100vh - 8em)', paddingBottom: '20px' }}
    >
      <div className="flex items-center justify-between mb-4 p-4">
        <h5 className="text-xl font-bold leading-none text-white">Chat</h5>
      </div>

      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {groups.map((group) => (
            <li key={group.id} className="py-4" onClick={() => onSelectGroup(group.id, group.isGroupChat ? 'Group Chat' : group.users[0].name)}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="w-8 h-8 rounded-full cursor-pointer"
                    src={favicon}
                    alt="Group image"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-lg font-semibold text-gray-200 truncate cursor-pointer">
                    {group.isGroupChat ? 'Group Chat' : group.users[0].name}
                  </p>
                  <p className="text-sm font-medium text-gray-200 truncate">
                    Users: {group.users.map((u) => u.name).join(', ')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};