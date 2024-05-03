import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from './Popup';
import ChatContent from './ChatContent';
import TodoContent from './TodoContent';
import iconToggle from '../../public/icon/toggle.png';
import Todo1 from '../../public/icon/todo-1.png';
import Todo2 from '../../public/icon/todo-2.png';
import Chat1 from '../../public/icon/chat-1.png';
import Chat2 from '../../public/icon/chat-2.png';

const Main = () => {
  const [showIcons, setShowIcons] = useState(false);
  // const [chatIcons, setChatIcons] = useState(false);
  // const [todoIcons, setTodoIcons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('idle'); // idle, chat, todo

  const handleIconClick = () => {
    setShowIcons(!showIcons);
  };

  const handleChat = () => {
    setIsLoading(true);
    setMode('chat');
  };

  const handleTodo = () => {
    setMode('todo');
  };

  return (
    <div className="flex-grow p-4 bg-[#333333]">
      <div className="fixed bottom-4 right-4">
        <motion.div
          className={`w-12 h-12 ${
            mode === 'chat' || mode === 'todo' ? 'bg-[#4F4F4F]' : 'bg-[#2F80ED]'
          } rounded-full flex justify-center items-center`}
          onClick={handleIconClick}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <img src={iconToggle} alt="menu" className="w-3 cursor-pointer" />
        </motion.div>
      </div>
      <AnimatePresence>
        {showIcons && (
          <div className="fixed bottom-4 right-20 flex space-x-4">
            <motion.div
              className={`w-11 h-11 ${
                mode === 'todo' ? 'bg-[#8785FF]' : 'bg-[#F2F2F2]'
              }  rounded-full flex justify-center items-center`}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: mode === 'chat' ? 60 : 0 || mode === 'todo' ? 130 : 0,
              }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleTodo}
            >
              <img
                src={`${mode === 'todo' ? Chat2 : Chat1}`}
                alt="menu"
                className="w-5 cursor-pointer"
              />
            </motion.div>
            <motion.div
              className={`w-11 h-11 ${
                mode === 'chat' ? 'bg-[#F8B76B]' : 'bg-[#F2F2F2]'
              }  rounded-full flex justify-center items-center`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: mode === 'chat' ? 70 : 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleChat}
            >
              <img
                src={`${mode === 'chat' ? Todo2 : Todo1}`}
                alt="menu"
                className="w-5 cursor-pointer"
              />
            </motion.div>
          </div>
        )}
        <Popup
          isOpen={mode === 'chat' || mode === 'todo'}
          content={
            mode === 'todo' ? (
              <ChatContent isLoading={isLoading} />
            ) : (
              <TodoContent />
            )
          }
        />
      </AnimatePresence>
    </div>
  );
};

export default Main;
