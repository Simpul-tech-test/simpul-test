import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = ({ isOpen, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-8 bg-white overflow-hidden rounded-md shadow-md "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
