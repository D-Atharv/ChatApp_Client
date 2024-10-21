import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlockGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BlockGroupModal: React.FC<BlockGroupModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState<string>(''); // Input email to block
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleBlockGroup = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
    
        try {
            const response = await fetch('/api/block/toBlock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otherUserEmail: email }), 
            });
    
            if (response.ok) {
                setSuccess('User successfully blocked!');
                setEmail(''); 
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to block user.');
            }
        } catch (error) {
            setError('An error occurred while blocking the user.');
        } finally {
            setLoading(false);
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
                    <h2 className="text-xl font-bold mb-4">Block Group or User</h2>
                    <p className="mb-4">Enter the email of the user or group you want to block:</p>
                    
                    <input
                        type="email"
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter email to block"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}

                    <div className="flex justify-end">
                        <button
                            onClick={handleBlockGroup}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            disabled={loading || !email}
                        >
                            {loading ? 'Blocking...' : 'Block'}
                        </button>
                        <button
                            onClick={onClose}
                            className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BlockGroupModal;
