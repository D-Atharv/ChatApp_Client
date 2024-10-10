"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import favicon from '../../../../styles/svg/favicon.ico';
import plus from '../../../../styles/svg/plus.svg';
import { fetchGroups } from '../../../server/fetchGroup';
import UserUpdateModal from '../modals/UpdateUser';
import AddUserModal from '../modals/AddUser';

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
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to store the selected user
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const openUpdateUserModal = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
    setDropdownOpen(false); 
  };

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
    setDropdownOpen(false); 
  };

  const closeModals = () => {
    setIsUpdateModalOpen(false);
    setIsAddUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = (name: string, email: string) => {
    console.log('New user added:', { name, email });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  if (loading) {
    return <p className="text-white">Loading groups...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <UserUpdateModal isOpen={isUpdateModalOpen} onClose={closeModals} user={selectedUser} />
      <AddUserModal isOpen={isAddUserModalOpen} onClose={closeModals} onAddUser={handleAddUser} />

      <div
        className="relative w-full h-full p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow border border-gray-200 overflow-y-auto bg-blue-gradient"
        style={{ height: 'calc(100vh - 8em)', paddingBottom: '20px' }}
      >
        <div className="flex items-center justify-between mb-4 p-4 relative">
          <h5 className="text-xl font-bold leading-none text-white">Chat</h5>
          <div className="relative">
            <button onClick={toggleDropdown}>
              <Image src={plus} alt="Options" width={20} height={20} />
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef} // Set ref for dropdown
                className="absolute right-0 mt-2 w-36 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-50 sm:right-[-20px]"
              >
                <ul className="py-2 ">
                  <li>
                    <button
                      onClick={() => openUpdateUserModal(groups[0].users[0])} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Update Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openAddUserModal}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 dark:hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white"
                    >
                      Add New User
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {groups.map((group) => (
              <li
                key={group.id}
                className="py-4 px-2 rounded-sm dark:hover:bg-sky-950"
                onClick={() => onSelectGroup(group.id, group.isGroupChat ? 'Group Chat' : group.users[0].name)}
              >
                <div className="flex items-center rounded-xl">
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
    </>
  );
};
