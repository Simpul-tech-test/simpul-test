import React from 'react';

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessage> = ({ sender, message, timestamp }) => {
  return (
    <div className={`flex items-start ${sender === 'You' ? 'flex-row-reverse' : ''}`}>
      <div className="mr-4">
        <p className="text-sm font-bold">{sender}</p>
        <p className="text-gray-500">{timestamp.toLocaleString()}</p>
      </div>
      <div className="flex-grow">
        <p className="bg-gray-100 rounded-md p-4">{message}</p>
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const messageInputRef = React.createRef<HTMLInputElement>();
  
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
      
        const message = messageInputRef.current?.value || ''; // Access value using ref
      
        if (message) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: 'You',
              message,
              timestamp: new Date(),
            },
          ]);
      
          // Clear the input field using the reference
          messageInputRef.current?.value || '';
        }
      };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.timestamp.toISOString()} {...message} />
        ))}
      </div>
      <form className="flex items-center p-4" onSubmit={handleSubmit}>
        <input
         ref={messageInputRef}
          type="text"
          name="message"
          className="flex-grow px-4 py-2 rounded-md border border-gray-300"
          placeholder="Enter your message..."
        />
        <button type="submit" className="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
