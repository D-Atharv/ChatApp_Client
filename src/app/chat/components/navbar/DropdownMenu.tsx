import { motion } from 'framer-motion';
import { useAuthContext } from '@/context/AuthContext';
import { useLogOut } from '@/hooks/auth/useLogout';

export const DropdownMenu = () => {
    const { authUser } = useAuthContext();
    const logout = useLogOut();

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { type: 'damping', stiffness: 300, damping: 20 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            className="absolute right-0 top-full mt-2 w-48 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow dark:bg-blue-gradient dark:divide-gray-600 z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
        >
            <div className="px-4 py-3">
                <span className="block text-sm text-white dark:text-white">{authUser?.name || 'USER'}</span>
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
    );
};
