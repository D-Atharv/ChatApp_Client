import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageModalProps } from '../../../../types/allTypes';

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, initials, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative bg-white p-4 rounded-lg shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600"
            >
              Close
            </button>
            <div className="w-full h-full max-w-md max-h-96 flex items-center justify-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="User Profile"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-40 h-40 bg-gray-200 rounded-full">
                  <span className="text-4xl font-bold text-gray-700">{initials}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
 