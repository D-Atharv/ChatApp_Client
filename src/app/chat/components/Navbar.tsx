'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import eye from '../../../../styles/svg/eye-solid.svg';
import { useAuthContext } from '@/context/AuthContext';
import { useLogOut } from '@/hooks/auth/useLogout';

export const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const { authUser } = useAuthContext();
    const logout = useLogOut();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false); 
        }
    };

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside); 
        } else {
            document.removeEventListener('mousedown', handleClickOutside); 
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); 
        };
    }, [dropdownOpen]);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { type:'damping', stiffness: 300, damping: 20 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    return (
        <nav className="border border-gray-200 bg-blue-gradient mx-2 my-2 rounded-xl">
            <div className="relative max-w-screen flex items-center justify-between p-4 px-10">
                <a href="#" className="flex items-center space-x-3">
                    <Image src={eye} width={70} height={70} alt="Eye logo" className="h-8" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Iris</span>
                </a>
                <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
                    <button
                        type="button"
                        className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={dropdownOpen}
                        onClick={toggleDropdown}
                    >
                        <span className="sr-only">Open user menu</span>
                        {authUser?.image ? (
                            <Image
                                src={authUser.image}
                                width={40}
                                height={40}
                                alt="user photo"
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-500" />
                        )}
                    </button>

                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                className="absolute right-0 top-full mt-2 w-48 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow dark:bg-blue-gradient dark:divide-gray-600 z-50"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dropdownVariants}
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-white  dark:text-white">
                                        {authUser?.name || 'USER'}
                                    </span>
                                    <span className="block text-sm text-white truncate dark:text-gray-400">
                                        {authUser?.email || 'EMAIL'}
                                    </span>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <motion.button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            whileTap={{ scale: 0.95 }} 
                                        >
                                            Sign out
                                        </motion.button>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};
