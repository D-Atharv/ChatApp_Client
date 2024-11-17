import { motion, AnimatePresence } from 'framer-motion';
import { DropdownProps } from '../../../../../types/allTypes';

export const ProfileDropdown: React.FC<DropdownProps> = ({
    isOpen,
    // onUpdateProfile,
    onAddUser,
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="absolute right-0 mt-2 w-36 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-50 sm:right-[-20px]"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } }
                }}
            >
                <ul className="py-2">
                    <motion.li whileTap={{ scale: 0.95 }}>
                        {/* <button
                            onClick={onUpdateProfile}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-600"
                        >
                            Update Profile
                        </button> */}
                    </motion.li>
                    <motion.li whileTap={{ scale: 0.95 }}>
                        <button
                            onClick={onAddUser}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-600"
                        >
                            Add New User
                        </button>
                    </motion.li>
                </ul>
            </motion.div>
        </AnimatePresence>
    );
};