import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  setIsSearchActive,
}) => {
  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  return (
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
  );
};

export default SearchBar;
