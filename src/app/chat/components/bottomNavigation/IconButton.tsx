import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface IconButtonProps {
  src: string;
  alt: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const IconButton: React.FC<IconButtonProps> = ({ src, alt, onClick }) => {
  const variants = {
    whileHover: {
      scale: 1.05,
      backgroundColor: '#4B5563',
    },
    whileTap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      whileHover={variants.whileHover}
      whileTap={variants.whileTap}
      className="px-4 py-2 rounded-lg"
      onClick={onClick}
    >
      <Image src={src} alt={alt} width={30} height={30} />
    </motion.div>
  );
};

export default IconButton;
