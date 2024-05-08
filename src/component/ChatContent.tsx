import React, { useState } from 'react';
import iconSearch2 from '../../public/icon/search2.png';
import groupChat from '../../public/icon/groupChat.png';
import { useQuery } from 'react-query';
import { chatService } from '../service/chatt';
import { ChattData } from '../types/chatt';
import MainChat from './MainChat';

const ChatContent: React.FC = () => {
  const { data: chatData, isLoading, error } = useQuery('chats', () => chatService.getList());

  const [content, setContent] = useState(false);

  const handleClick = () => {
    setContent(!content);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-[650px] h-[480px] my-6 mx-8">
      {content ? (
         <MainChat onCloseClick={handleClick} 
        //  id={''} 
         />
      ) : (
        <div className="py-2 px-6">
          <div className="relative mb-1">
            <input
              type="text"
              className="w-full border border-slate-400 rounded p-1"
            />
            <div className="absolute top-1 left-10">
              <p className="text-slate-400">Search</p>{' '}
            </div>
            <div className="absolute top-3 right-10">
              {' '}
              <img src={iconSearch2} alt="Search Icon" className="w-3 h-3" />
            </div>
          </div>
          <div className="overflow-y-auto h-[400px] mt-[22px] scrollbar-thin scrollbar-thumb-gray-300">
          {chatData?.data.map((item: ChattData) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-x-2 pt-2 pb-[22px]  border-b-2 border-slate-300 cursor-pointer"
                onClick={handleClick}
              >
                <div className="col-span-1 text-center">
                <img src={groupChat} alt="chat" className="m-auto" />
                </div>
                <div className="col-span-11 pl-3">
                  <div className="flex gap-x-5">
                    <h2 className="text-[#2F80ED] font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-xs whitespace-nowrap mt-1">
                      {item.created_at}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-sm font-bold">{item.sender} :</p>
                    <p className="text-xs ">{item.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContent;
