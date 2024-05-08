import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import { useQuery, useMutation } from 'react-query';
import { chatService } from '../service/chatt';
import { ChattData } from '../types/chatt';

interface MainChatProps {
  onCloseClick: () => void;
}

interface MessageProps {
  id: string;
  content: string;
  sender: string;
  time: string;
  onEdit: (id: string, newContent: string, sender: string, createdAt: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  setEditMessageId: React.Dispatch<React.SetStateAction<string | null>>;
}

const MainChat: React.FC<MainChatProps> = ({ onCloseClick }) => {
  const { data: chatData, isLoading, error, refetch } = useQuery('chats', () => chatService.getList());

  const sendMessageMutation = useMutation(chatService.create, {
    onSuccess: () => {
      refetch(); // Refresh messages after sending a new message
    },
  });

  const editMessageMutation = useMutation(chatService.edit, {
    onSuccess: () => {
      refetch(); // Refresh messages after editing a message
    },
  });

  const deleteMessageMutation = useMutation(chatService.delete, {
    onSuccess: () => {
      refetch(); // Refresh messages after deleting a message
    },
  });

  const [newMessage, setNewMessage] = useState('');
  const [editMessageId, setEditMessageId] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Don't send empty messages
    await sendMessageMutation.mutateAsync({ message: newMessage, sender: 'diska', created_at: new Date().toISOString() });
    setNewMessage(''); // Clear input field after sending message
  };

  const handleEditMessage = async (id: string, newContent: string, sender: string, createdAt: string) => {
    await editMessageMutation.mutateAsync({ id, data: { message: newContent, sender, created_at: createdAt } });
    setEditMessageId(null); // Reset edit message state
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteMessageMutation.mutateAsync(id);
  };

  const renderMessagesWithSeparators = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error fetching messages...</div>;
    }

    return chatData?.data.map((messages: ChattData) => {
      const { id, message, sender, created_at } = messages;

      return (
        <React.Fragment key={id}>
          <Message
            id={id}
            content={message}
            sender={sender}
            time={created_at}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
            isEditing={editMessageId === id}
            setEditMessageId={setEditMessageId}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <div className="border-b-2 border-slate-300">
        <div className="mx-8 items-center grid grid-cols-12 mb-3">
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
      <div className="h-[360px] mx-5 my-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {renderMessagesWithSeparators()}
      </div>
      <div className="mx-5 flex items-center">
        <input
          className="border border-slate-500 p-2 rounded-md w-[83%]"
          type="text"
          placeholder="Type a new message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-[#2F80ED] text-white font-semibold py-2 px-5 rounded ml-3"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ id, content, sender, time, onEdit, onDelete, isEditing, setEditMessageId }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleEditButtonClick = () => {
    if (!isEditing) {
      setEditMessageId(id);
    } else {
      onEdit(id, newContent, sender, time);
    }
  };

  return (
    <div className={`mb-2 mx-2 ${sender === 'diska' ? 'text-right' : 'text-left'}`}>
      <p className={`text-sm font-bold mb-1 ${sender === 'diska' ? 'text-[#AD72E6]' : sender === 'Friend1' ? 'text-[#E5A443]' : 'text-[#72C9A9]'}`}>
        {sender}
      </p>
      <div>
        <div className={`${sender === 'diska' ? 'bg-[#EEDCFF] rounded-md' : sender === 'Friend1' ? 'bg-[#FCEED3] rounded-md' : 'bg-[#D2F2EA] rounded-md'} inline-block p-2 max-w-[70%] rounded-md relative`}>
          {isEditing ? (
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="border-b border-slate-500"
            />
          ) : (
            <>
              {content}
              <p className="text-xs mb-1">{time}</p>
            </>
          )}
          <div className="relative">
            <SlOptions onClick={handleOptionsClick} className={`cursor-pointer absolute -top-14 ${sender === 'diska' ? '-left-8' : '-right-8'}`} />
            {showOptions && (
              <div className={`absolute ${sender === 'diska' ? 'right-0' : 'left-[150px]'} right-10 -bottom-7 divide-y bg-white rounded shadow-md w-24`}>
                <div className="text-blue-500 text-start px-3 py-1" onClick={handleEditButtonClick}>{isEditing ? 'Save' : 'Edit'}</div>
                <div className="text-red-500 text-start px-3 py-1" onClick={() => onDelete(id)}>Delete</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
