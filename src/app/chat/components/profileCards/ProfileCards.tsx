import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, Reorder } from 'framer-motion';
import Fuse from 'fuse.js';  
import plus from '../../../../../styles/svg/plus.svg';
import { fetchGroups, addUserToGroup } from '../../../../../services/fetchGroup';
import { updateUser } from '../../../../../services/updateUser';
import UserUpdateModal from '../../modals/UpdateUser';
import AddUserModal from '../../modals/AddUser';
import BottomNavigation from '../bottomNavigation/BottomNavigation';
import { useAuthContext } from '@/context/AuthContext';
import ImageModal from '../../modals/ImageModal';
import { ProfileDropdown } from './ProfileDropdown';
import { GroupItem } from './GroupItem';
import { UserProfile } from './UserProfile';
import { Group, User, ProfileCardsProps } from '../../../../../types/allTypes';


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
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(''); 
  const [modalInitials, setModalInitials] = useState<string>(''); 

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // const dropdownRef = useRef<HTMLDivElement>(null);
  const profileCardsRef = useRef<HTMLDivElement>(null); 


  useEffect(() => {
    
    const fetchAndSetGroups = async () => {
      try {
        const fetchedGroups = await fetchGroups();
        setGroups(fetchedGroups);
        setFilteredGroups(fetchedGroups);  
      } catch (error) {
        setError('Failed to fetch groups');
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetGroups();
  }, []);

  useEffect(() => {
    const fuseOptions = {
      keys: ['users.name'],
      threshold: 0.3,  
    };
  
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
      await addUserToGroup(email);
      setIsAddUserModalOpen(false);
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  const handleUpdateUser = async (name: string, image: File | null, newPassword: string) => {
    try {
      await updateUser(name, image, newPassword);
      setIsUpdateModalOpen(false);
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

    setSelectedGroupId(group.id);

    onSelectGroup(group.id, groupName);

    setIsSearchActive(false);
    setSearchQuery('');
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
        onUpdateUser={handleUpdateUser}
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={closeModals}
        onAddUser={handleAddUser}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={modalImageUrl}
        initials={modalInitials}
        onClose={() => setIsImageModalOpen(false)}
      />

      <div 
        ref={profileCardsRef}
        className="relative w-full h-full p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow border border-gray-200 overflow-y-auto bg-blue-gradient"
        style={{ height: 'calc(100vh - 8em)', paddingBottom: '20px' }}
      >
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
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image src={plus} alt="Options" width={20} height={20} />
                  </motion.button>
                  <ProfileDropdown
                    isOpen={dropdownOpen}
                    onClose={() => setDropdownOpen(false)}
                    onUpdateProfile={() => openUpdateUserModal(groups[0].users[0])}
                    onAddUser={openAddUserModal}
                  />
                </div>
              </div>

              <div className="flow-root">
                <Reorder.Group 
                  axis="y" 
                  values={filteredGroups} 
                  onReorder={setFilteredGroups}
                  className="divide-y divide-gray-200"
                >
                  {filteredGroups.map((group) => (
                    <GroupItem
                      key={group.id}
                      group={group}
                      isSelected={selectedGroupId === group.id}
                      onSelect={handleGroupSelection}
                      onImageClick={openImageModal}
                    />
                  ))}
                </Reorder.Group>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: flip ? 180 : 180 }}
              transition={{ duration: 0.9 }}
            >
              {authUser && (
                <UserProfile
                  user={authUser}
                  onImageClick={openImageModal}
                />
              )}
            </motion.div>
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