import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  name: string;
  newPassword: string;
  image: string | null;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUser: (name: string, image: File | null, newPassword: string) => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    image: null as File | null,
    name: '',
    newPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        image: null,
        name: user.name,
        newPassword: user.newPassword,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateUser(formData.name, formData.image,formData.newPassword);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full backdrop-blur-md bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Profile
              </h3>
              <motion.button
                type="button"
                className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-2"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6m-6-6l6-6m-6 6L1 13" />
                </svg>
                <span className="sr-only">Close modal</span>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center my-4">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Uploaded preview"
                    className="mt-4 rounded-full w-24 h-24 object-cover"
                  />
                )}
              </div>

              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-2">
                <motion.button
                  type="button"
                  className="bg-red-600 text-white rounded-lg px-3 py-2 w-full hover:bg-red-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Deactivate Account
                </motion.button>
                <motion.div className="flex gap-2 w-full mt-2 sm:mt-0">
                  <motion.button
                    type="button"
                    className="bg-gray-200 text-gray-700 rounded-lg px-3 py-2 w-full hover:bg-gray-300"
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg px-3 py-2 w-full hover:bg-blue-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Update
                  </motion.button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

