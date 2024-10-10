import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  image: string | null;
}

interface UserUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUser: (name: string, image: File | null) => void; // Pass a callback to handle updates
}

const UserUpdateModal: React.FC<UserUpdateModalProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateUser(name, image); // Call the updateUser function passed in props
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full backdrop-blur-md bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Profile</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6m-6-6l6-6m-6 6L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateModal;
