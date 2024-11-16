import React, { useEffect, useRef, useReducer, act } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import Fuse from 'fuse.js';
import plus from '../../../../../styles/svg/plus.svg';
import { fetchGroups, addUserToGroup } from '../../../../../services/fetchGroup';
import { updateUser } from '../../../../../services/updateUser';
import UserUpdateModal from '../../modals/UpdateUser';
import AddUserModal from '../../modals/AddUser';
import BottomNavigation from '../bottomNavigation/BottomNavigation';
import { useAuthContext } from '@/context/AuthContext';
import ImageModal from '../../modals/ImageModal';
import { Group, User, ProfileCardsProps } from '../../../../../types/allTypes';
import { useProfileCardsReducer } from './UseReducer';

export const ProfileCards = ({ onSelectGroup }: ProfileCardsProps) => {
  const { authUser } = useAuthContext();
  const { state, actions } = useProfileCardsReducer();

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
        actions.setGroups(fetchedGroups);
        actions.setLoading(false);
      } catch (error) {
        actions.setError('Failed to fetch groups');
      }
    };

    fetchAndSetGroups();
  }, [actions]);

  useEffect(() => {
    if (state.searchQuery.trim() === '') {
      actions.setFilteredGroups(state.groups)
    } else {
      const fuse = new Fuse(state.groups, fuseOptions);
      const result = fuse.search(state.searchQuery);
      actions.setFilteredGroups(result.map(({ item }) => item))
    }
  }, [state.searchQuery, state.groups]);

  const toggleDropdown = () => {
    actions.toggleDropdown()
  };

  const openUpdateUserModal = (user: User) => {
    actions.setUpdateModal(true, user)
  };

  const openAddUserModal = () => {
    actions.setAddUserModal(true);
  };

  const closeModals = () => {
    actions.closeModals();
  };

  const handleAddUser = async (email: string) => {
    try {
      await addUserToGroup(email);
      actions.setAddUserModal(false);
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  const handleUpdateUser = async (name: string, image: File | null, newPassword: string) => {
    try {
      await updateUser(name, image, newPassword);
      actions.setUpdateModal(false, null);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleGroupSelection = (group: Group, event: React.MouseEvent) => {
    event.stopPropagation();
    const groupName = group.isGroupChat
      ? 'Group Chat'
      : group.users.length > 0
        ? group.users[0].name
        : 'Unnamed Group';
    actions.setSelectedGroup(group.id);
    onSelectGroup(group.id, groupName);
  };

  const getUserInitials = (name: string) => {
    const [firstName = '', lastName = ''] = name.split(' ');
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const openImageModal = (imageUrl: string | null, initials: string) => {
    actions.setImageModal(true, imageUrl, initials);
  };


  if (state.loading) {
    return <p className="text-white">Loading groups...</p>;
  }

  if (state.error) {
    return <p className="text-red-500">{state.error}</p>;
  }

  return (
    <>
      <UserUpdateModal
        isOpen={state.isUpdateModalOpen}
        onClose={closeModals}
        user={state.selectedUser}
        onUpdateUser={handleUpdateUser}
      />

      <AddUserModal
        isOpen={state.isAddUserModalOpen}
        onClose={closeModals}
        onAddUser={handleAddUser}
      />

      <ImageModal
        isOpen={state.isImageModalOpen}
        imageUrl={state.modalImageUrl}
        initials={state.modalInitials}
        onClose={() => actions.setImageModal(false, null, '')}
      />

      <div ref={profileCardsRef} className="relative w-full h-full p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow border border-gray-200 overflow-y-auto bg-blue-gradient" style={{ height: 'calc(100vh - 8em)', paddingBottom: '20px' }}>
        <motion.div
          transition={{ duration: 0.9, ease: 'circInOut' }}
          animate={{ rotateY: state.flip ? 0 : 180 }}
          className="Card"
          style={{ perspective: '1000px' }}
        >

          {state.flip ? (
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
                    {state.dropdownOpen && (
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
                              onClick={() => openUpdateUserModal(state.groups[0].users[0])}
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
                <Reorder.Group
                  axis="y"
                  values={state.filteredGroups}
                  onReorder={(updatedFilteredGroups) =>
                    actions.setFilteredGroups(updatedFilteredGroups)
                  }
                >

                  {state.filteredGroups.map((group) => (
                    <Reorder.Item key={group.id} value={group}>
                      <li
                        className={`py-4 px-2 rounded-sm cursor-pointer hover:bg-sky-950 ${state.selectedGroupId === group.id ? 'bg-neutral-800' : ''
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
                animate={{ rotateY: state.flip ? 180 : 180 }}
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
          flip={state.flip}
          setFlip={actions.toggleFlip}
          isSearchActive={state.isSearchActive}
          setIsSearchActive={(value) =>
            actions.setSearch(
              typeof value === 'function' ? value(state.isSearchActive) : value,
              state.searchQuery
            )
          }
          searchQuery={state.searchQuery}
          setSearchQuery={(value) =>
            actions.setSearch(
              state.isSearchActive,
              typeof value === 'function' ? value(state.searchQuery) : value
            )
          }
        />
      </div>
    </>
  );
};
