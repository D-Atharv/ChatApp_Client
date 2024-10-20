import { motion } from 'framer-motion';
import profile from '../../../../styles/svg/profile.svg';
import search from '../../../../styles/svg/search.svg';
import Image from 'next/image';
import React from 'react';

const variants = {
  whileHover: {
    scale: 1.05,
    backgroundColor: '#4B5563',
  },
  whileTap: {
    scale: 0.95,
  },
};

interface BottomNavigationProps {
  flip: boolean;
  setFlip: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchActive: boolean;
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  flip,
  setFlip,
  isSearchActive,
  setIsSearchActive,
  searchQuery,
  setSearchQuery,
}) => {
  const handleClearSearch = () => {
    setSearchQuery(''); 
    setIsSearchActive(false); 
  };

  return (
    <div className="absolute bottom-2 inset-x-0 max-w-full mx-2 my-2">
      {isSearchActive ? (
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search profiles..."
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500"
          />
          <button
            onClick={handleClearSearch}
            className="absolute right-3 px-2 text-white bg-red-700 p-1 rounded-md"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex justify-around bg-gray-800 py-1.5 border-t border-gray-600 rounded-lg">
          <motion.div
            whileHover={variants.whileHover}
            whileTap={variants.whileTap}
            className="px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();  
              setFlip((prev) => !prev);
            }}
          >
            <Image
              src={profile}
              alt="profile"
              width={30}
              height={30}
            />
          </motion.div>

          <motion.div
            whileHover={variants.whileHover}
            whileTap={variants.whileTap}
            className="px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();  
              setIsSearchActive(true);
            }}
          >
            <Image
              src={search}
              alt="search"
              width={30}
              height={30}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
