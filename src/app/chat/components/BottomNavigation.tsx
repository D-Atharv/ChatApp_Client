import { motion } from 'framer-motion';
import React from 'react';
import profile from '../../../../styles/svg/profile.svg';
import search from '../../../../styles/svg/search.svg';
import Image from 'next/image';

const variants = {
  whileHover: {
    scale: 1.05,
    backgroundColor: '#4B5563'
  }
  ,
  whileTap: {
    scale: 0.95
  }
}

const BottomNavigation = () => {
  return (
    <div className="absolute bottom-2 inset-x-0 max-w-full mx-2 my-2 rounded-lg bg-gray-800 py-1.5 border-t border-gray-600">
      <div className="flex justify-around">
        <motion.div
          whileHover={variants.whileHover}
          whileTap={variants.whileTap}
          className="px-4 py-2 rounded-lg"
        >
          <Image
            src={profile}
            alt="profile"
            width={30}
            height={30}
            />
        </motion.div>

        <motion.div
          
          whileHover={variants.whileHover}
          whileTap={variants.whileTap}
          className="px-4 py-2 rounded-lg"
        >
          <Image
            src={search}
            alt="search"
            width={30}
            height={30}
            />
        </motion.div>
      </div>
    </div>
  );
};

export default BottomNavigation;
