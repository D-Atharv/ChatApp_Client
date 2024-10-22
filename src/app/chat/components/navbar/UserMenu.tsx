import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { DropdownMenu } from './DropdownMenu';
import { useAuthContext } from '@/context/AuthContext';

export const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const { authUser } = useAuthContext();
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

    return (
        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
            <button
                type="button"
                className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                {authUser?.image ? (
                    <Image
                        src={authUser.image}
                        width={40}
                        height={40}
                        alt="User photo"
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-500" />
                )}
            </button>

            <AnimatePresence>{dropdownOpen && <DropdownMenu />}</AnimatePresence>
        </div>
    );
};
