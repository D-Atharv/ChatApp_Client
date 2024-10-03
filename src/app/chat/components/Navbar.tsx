'use client'

import Image from 'next/image';
import { useState } from 'react';
import eye from '../../../../styles/svg/eye-solid.svg';
import dp from '../../../../styles/svg/eye-solid.svg';
import { useAuthContext } from '@/context/AuthContext';
import { useLogOut } from '@/hooks/auth/useLogout';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const { authUser } = useAuthContext();
    const logout = useLogOut();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="bg-gray-900 border border-gray-200 dark:bg-gray-900  mx-2 my-2 rounded-xl">
            <div className="relative max-w-screen flex items-center justify-between  p-4 px-10">
                <a href="#" className="flex items-center space-x-3">
                    <Image src={eye} width={70} height={70} alt="Eye logo" className="h-8" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Iris</span>
                </a>
                <div className="flex items-center space-x-3 relative">
                    {/* User Profile Button */}
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
                                className="w-8 h-8 rounded-full "
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-500" />
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-50">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{authUser?.name || 'USER'}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{authUser?.email || 'EMAIL'}</span>
                            </div>
                            <ul className="py-2">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Night Mode
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={logout} 
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
