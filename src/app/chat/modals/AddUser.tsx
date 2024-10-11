import React, { useState } from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (email: string) => void; 
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [email, setEmail] = useState<string>('');

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddUser(email);
    onClose(); 
  };

  if (!isOpen) return null; 

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full backdrop-blur-md bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700 mx-4 sm:mx-10 md:mx-12 lg:mx-0"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New User</h3>
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

        <form className="p-4" onSubmit={handleAddUser}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="flex gap-x-2">
            <button
              type="button"
              className="w-1/2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
