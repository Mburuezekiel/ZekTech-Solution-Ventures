import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <motion.img
          src="/ZekTechLogo.png"
          alt="ZekTech Logo"
          className="h-20 w-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Three Dots Loading */}
        <div className="flex space-x-3">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary rounded-full"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
