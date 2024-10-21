import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface BlockedGroup {
  userId: string;
  name: string;
  email: string;
  image: string | null;
}

interface SeeBlockedGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SeeBlockedGroupsModal: React.FC<SeeBlockedGroupsModalProps> = ({ isOpen, onClose }) => {
  const [blockedGroups, setBlockedGroups] = useState<BlockedGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchBlockedGroupsData();
    }
  }, [isOpen]);

  const fetchBlockedGroupsData = async () => {
    setLoading(true);
    try {
      const response = await fetchBlockedGroups();
      setBlockedGroups(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnblockGroup = async (userId: string) => {
    try {
      await unblockGroup(userId);
      setBlockedGroups((prev) => prev.filter((group) => group.userId !== userId));
    } catch (error) {
      console.error('Failed to unblock group:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <motion.div
          className="bg-white rounded-lg w-3/4 p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <h2 className="text-xl font-bold mb-4">Blocked Groups</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : blockedGroups.length === 0 ? (
            <p>No blocked groups.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {blockedGroups.map((group) => (
                <li key={group.userId} className="flex items-center py-4">
                  <div className="relative w-12 h-12 mr-4">
                    {group.image ? (
                      <Image
                        className="rounded-full"
                        src={group.image}
                        alt={group.name}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center text-white">
                        {group.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{group.name}</p>
                    <p className="text-sm text-gray-500">{group.email}</p>
                  </div>
                  <button
                    onClick={() => handleUnblockGroup(group.userId)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Unblock
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={onClose}
            className="mt-4 bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SeeBlockedGroupsModal;
