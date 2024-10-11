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

  const handleAddUser = async (email: string) => {
    try {
      const response = await fetch('/api/group/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otherUserEmail: email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Group created:', data);
      } else {
        console.error('Error adding user:', data.message);
      }
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const handleUpdateUser = async (name: string, image: File | null) => {
    try {
      let response;
      
      if (image) {
        // If image is provided, send FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        response = await fetch('/api/user/updateUser', {
          method: 'PATCH',
          body: formData,
        });
      } else {
        // If no image, send JSON
        response = await fetch('/api/user/updateUser', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, image: null }),
        });
      }

      const data = await response.json();
      if (response.ok) {
        console.log('User updated:', data);
      } else {
        console.error('Error updating user:', data.message);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
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

  const handleGroupSelection = (group: Group) => {
    // Ensure proper group selection and clear any previous state
    const groupName = group.isGroupChat ? 'Group Chat' : group.users[0].name;
    onSelectGroup(group.id, groupName); 
  };

  if (loading) {
    return <p className="text-white">Loading groups...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <UserUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={closeModals}
        user={selectedUser}
        onUpdateUser={handleUpdateUser} 
      />
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={closeModals}
        onAddUser={handleAddUser}  
      />

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
                ref={dropdownRef} 
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
                onClick={() => handleGroupSelection(group)} 
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
