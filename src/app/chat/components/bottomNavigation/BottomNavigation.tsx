import React from 'react';
import SearchBar from './SearchBar';
import IconButton from './IconButton';
import profile from '../../../../../styles/svg/profile.svg';
import search from '../../../../../styles/svg/search.svg';

interface BottomNavigationProps {
  flip: boolean;
  setFlip: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchActive: boolean;
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  setFlip,
  isSearchActive,
  setIsSearchActive,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="absolute bottom-2 inset-x-0 max-w-full mx-2 my-2">
      {isSearchActive ? (
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSearchActive={setIsSearchActive}
        />
      ) : (
        <div className="flex justify-around bg-gray-800 py-1.5 border-t border-gray-600 rounded-lg">
          <IconButton
            src={profile}
            alt="profile"
            onClick={(e) => {
              e.stopPropagation();
              setFlip((prev) => !prev);
            }}
          />
          <IconButton
            src={search}
            alt="search"
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchActive(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
