import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import Fuse from 'fuse.js';  
import plus from '../../../../styles/svg/plus.svg';
import { fetchGroups } from '../../../server/fetchGroup';
import UserUpdateModal from '../modals/UpdateUser';
import AddUserModal from '../modals/AddUser';
import BottomNavigation from './BottomNavigation';
import { useAuthContext } from '@/context/AuthContext';
import ImageModal from '../modals/ImageModal';

interface User {
  userId: string;
  name: string;
  email: string;
  newPassword: string;
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
  const { authUser } = useAuthContext();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [flip, setFlip] = useState<boolean>(true);

  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(''); // URL for the modal image
  const [modalInitials, setModalInitials] = useState<string>(''); // Initials for modal if image is missing

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileCardsRef = useRef<HTMLDivElement>(null); 

  const fuseOptions = {
    keys: ['users.name'],
    threshold: 0.3,  
  };

  useEffect(() => {
    const fetchAndSetGroups = async () => {
      try {
        const fetchedGroups = await fetchGroups();
        setGroups(fetchedGroups);
        setFilteredGroups(fetchedGroups);  
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetGroups();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredGroups(groups); 
    } else {
      const fuse = new Fuse(groups, fuseOptions);
      const result = fuse.search(searchQuery);
      setFilteredGroups(result.map(({ item }) => item));
    }
  }, [searchQuery, groups]);

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

  const handleUpdateUser = async (name: string, image: File | null, newPassword: string) => {
    try {
      let response;
      if (image) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('newPassword', newPassword);

        response = await fetch('/api/user/updateUser', {
          method: 'PATCH',
          body: formData,
        });
      } else {
        response = await fetch('/api/user/updateUser', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, image: null, newPassword }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log('User updated:', data);
      } else {
        const errorText = await response.text(); // Parse text if it's not JSON
        console.error('Error updating user:', errorText);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleGroupSelection = (group: Group, event: React.MouseEvent) => {
    event.stopPropagation();
    const groupName = group.isGroupChat
      ? 'Group Chat'
      : group.users.length > 0
        ? group.users[0].name
        : 'Unnamed Group';

    setSelectedGroupId(group.id);

    onSelectGroup(group.id, groupName);

    setIsSearchActive(false);
    setSearchQuery('');
  };

  const getUserInitials = (name: string) => {
    const [firstName = '', lastName = ''] = name.split(' ');
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const openImageModal = (imageUrl: string | null, initials: string) => {
    setModalImageUrl(imageUrl);
    setModalInitials(initials);
    setIsImageModalOpen(true);
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
        onUpdateUser={handleUpdateUser} />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={closeModals}
        onAddUser={handleAddUser} />

      <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={modalImageUrl}
        initials={modalInitials}
        onClose={() => setIsImageModalOpen(false)}
      />

      <div ref={profileCardsRef} className="relative w-full h-full p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow border border-gray-200 overflow-y-auto bg-blue-gradient" style={{ height: 'calc(100vh - 8em)', paddingBottom: '20px' }}>
        <motion.div
          transition={{ duration: 0.9, ease: 'circInOut' }}
          animate={{ rotateY: flip ? 0 : 180 }}
          className="Card"
          style={{ perspective: '1000px' }}
        >

          {flip ? (
            <>
              <div className="flex items-center justify-between mb-4 p-4 relative">
                <h5 className="text-xl font-bold leading-none text-white">Chat</h5>
                <div className="relative">
                  <motion.button
                    onClick={toggleDropdown}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <Image src={plus} alt="Options" width={20} height={20} />
                  </motion.button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-36 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-50 sm:right-[-20px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: { opacity: 0, y: -10 },
                          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } }
                        }}
                      >
                        <ul className="py-2 ">
                          <motion.li whileTap={{ scale: 0.95 }}>
                            <motion.button
                              onClick={() => openUpdateUserModal(groups[0].users[0])}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Update Profile
                            </motion.button>
                          </motion.li>
                          <motion.li whileTap={{ scale: 0.95 }}>
                            <motion.button
                              onClick={openAddUserModal}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 dark:hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white"
                            >
                              Add New User
                            </motion.button>
                          </motion.li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flow-root">
                <Reorder.Group axis="y" values={filteredGroups} onReorder={setFilteredGroups} className="divide-y divide-gray-200">
                  {filteredGroups.map((group) => (
                    <Reorder.Item key={group.id} value={group}>
                      <li 
                        className={`py-4 px-2 rounded-sm cursor-pointer hover:bg-sky-950 ${
                          selectedGroupId === group.id ? 'bg-neutral-800' : ''
                        }`}
                        onClick={(event) => handleGroupSelection(group, event)}
                      >
                        <div className="flex items-center rounded-xl">
                          <div className="relative flex-shrink-0">
                            {group.users[0]?.image ? (
                              <div
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  openImageModal(group.users[0].image, getUserInitials(group.users[0].name));
                                }}
                              >
                                <Image
                                  className="w-10 h-10 rounded-full"
                                  src={group.users[0].image}
                                  alt={group.users[0].name}
                                  width={40}
                                  height={40}
                                />
                              </div>
                            ) : (
                              <div
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  openImageModal(null, getUserInitials(group.users[0]?.name || 'User'));
                                }}
                              >
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                  <span className="font-medium text-gray-600 dark:text-gray-300">
                                    {getUserInitials(group.users[0]?.name || 'User')}
                                  </span>
                                </div>
                              </div>
                            )}
                            <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-lg font-semibold text-gray-200 truncate cursor-pointer">
                              {group.isGroupChat ? 'Group Chat' : group.users.length > 0 ? group.users[0].name : 'Unnamed Group'}
                            </p>
                            <p className="text-sm font-medium text-gray-200 truncate">
                              Users: {group.users.map((u) => u.name).join(', ') || 'No users available'}
                            </p>
                          </div>
                        </div>
                      </li>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: flip ? 180 : 180 }}
                transition={{ duration: 0.9 }}
              >
                <div className='flex items-center justify-center my-10'>
                  <div className="m-10 max-w-sm rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg text-center  w-full">
                    <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => openImageModal(authUser?.image || null, getUserInitials(authUser?.name || 'User'))}>
                      {authUser?.image ? (
                        <Image
                          src={authUser.image}
                          alt={authUser.name || 'User'}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-600">
                          <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                            {getUserInitials(authUser?.name || 'User')}
                          </span>
                        </div>
                      )}
                      <span className="absolute right-2 bottom-2 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                    </div>
                    <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">{authUser?.name || 'N/A'}</h1>
                    <p className="text-sm leading-6 text-gray-500 hover:text-gray-600">Short bio or description goes here.</p>
                    <ul className="mt-3 divide-y divide-gray-300 rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                      <li className="flex items-center py-3 text-sm">
                        <span>Email</span>
                        <span className="ml-auto">
                          <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{authUser?.email}</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
        <BottomNavigation
          flip={flip}
          setFlip={setFlip}
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </>
  );
};
