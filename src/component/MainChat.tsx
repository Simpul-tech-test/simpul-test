import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';

const MainChat = ({ onCloseClick }) => {
  const messages = [
    {
      id: 1,
      content: 'Hi there!',
      sender: 'You',
      time: '10:30 AM',
      date: 'Today June 09, 2021',
    },
    {
      id: 2,
      content: 'Hello! How are you?',
      sender: 'Friend1',
      time: '10:35 AM',
      date: 'Today June 09, 2021',
    },
    {
      id: 3,
      content: "I'm good. How about you?",
      sender: 'Friend2',
      time: '10:40 AM',
      date: 'Today June 09, 2021',
    },
    {
      id: 1,
      content: 'Hi there!',
      sender: 'You',
      time: '10:30 AM',
      date: 'New Message',
    },
    {
      id: 2,
      content: 'Hello! How are you?',
      sender: 'Friend1',
      time: '10:35 AM',
      date: 'New Message',
    },
    {
      id: 3,
      content: "I'm good. How about you?",
      sender: 'Friend2',
      time: '10:40 AM',
      date: 'New Message',
    },
  ];

  const renderMessagesWithSeparators = () => {
    let currentDate = null;

    return messages.map((message) => {
      const messageDate = message.date;

      let separator = null;

      if (currentDate !== messageDate) {
        currentDate = messageDate;

        separator = (
          <>
            <div
              className={`text-center mt-2 mb-1 font-semibold ${
                messageDate === 'New Message'
                  ? 'text-red-600'
                  : 'text-slate-600'
              } relative`}
            >
              <hr
                className={`mt-1 mb-2 ${
                  messageDate === 'New Message'
                    ? 'border-red-600'
                    : 'border-gray-300'
                }  absolute top-2 right-0 w-[210px]`}
              />
              {messageDate}
              <hr
                className={`mt-1 mb-2 ${
                  messageDate === 'New Message'
                    ? 'border-red-600'
                    : 'border-gray-300'
                } absolute top-2 w-[210px]`}
              />
            </div>
          </>
        );
      }

      return (
        <React.Fragment key={message.id}>
          {separator}
          <Message
            content={message.content}
            sender={message.sender}
            time={message.time}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <div className="border-b-2 border-slate-300">
        <div className="mx-8  items-center grid grid-cols-12 mb-3">
          <div className="text-xl col-span-1 cursor-pointer ">
            <FaArrowLeft onClick={onCloseClick} />
          </div>
          <div className="col-span-10 ">
            <h3 className="font-bold texba text-[#2F80ED]">
              I-589-AMARKHIL,Obaidullah[Affirmative Filling with ZHN]
            </h3>
            <p className="text-xs mt-1">3 Participants</p>
          </div>
          <div className="text-2xl col-span-1 ml-10 cursor-pointer ">
            <MdClose onClick={onCloseClick} className="m-auto" />
          </div>
        </div>
      </div>
      <div className=" h-[360px] mx-5 my-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {renderMessagesWithSeparators()}
      </div>
      <div className="mx-5 ">
        <input
          className="border border-slate-500 p-2 rounded-md w-[83%]"
          type="text"
          placeholder="Type a new message"
        />
        <button className="bg-[#2F80ED] text-white font-semibold py-2 px-5 rounded ml-3">
          Send
        </button>
      </div>
    </div>
  );
};

const Message = ({ content, sender, time }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div
      className={`mb-2 mx-2 ${sender === 'You' ? 'text-right' : 'text-left'}`}
    >
      <p
        className={`text-sm font-bold mb-1 ${
          sender === 'You'
            ? 'text-[#AD72E6]'
            : sender === 'Friend1'
            ? 'text-[#E5A443]'
            : 'text-[#72C9A9]'
        }`}
      >
        {sender}
      </p>
      <div>
        <div
          className={`${
            sender === 'You'
              ? 'bg-[#EEDCFF] rounded-md'
              : sender === 'Friend1'
              ? 'bg-[#FCEED3] rounded-md'
              : 'bg-[#D2F2EA] rounded-md'
          } inline-block p-2 max-w-[70%] rounded-md relative`}
        >
          {content}
          <p className="text-xs mb-1">{time}</p>
          <div className="relative">
            <SlOptions
              onClick={handleOptionsClick}
              className={`cursor-pointer absolute -top-14 ${
                sender === 'You' ? '-left-8' : '-right-8'
              }`}
            />
            {showOptions && (
              <div
                className={`absolute ${
                  sender === 'You' ? 'right-0' : 'left-[150px]'
                } right-10 -bottom-7  divide-y bg-white rounded shadow-md w-24`}
              >
                <div className="text-blue-500 text-start px-3 py-1 ">Edit</div>
                <div className="text-red-500 text-start px-3 py-1">Delete</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
