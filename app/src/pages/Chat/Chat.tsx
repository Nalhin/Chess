import * as React from 'react';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import { ChatContainerProps } from './Chat.container';

interface Props extends ChatContainerProps {}

const Chat: React.FC<Props> = ({ chatMessages, sendMessage, user }) => {
  const [messageInputValue, setMessageInputValue] = React.useState('');

  const handleSetNewMessageValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMessageInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(messageInputValue);
    setMessageInputValue('');
  };

  return (
    <div>
      {chatMessages.map(message => (
        <ChatMessage key={message.id} chatMessage={message} user={user} />
      ))}
      <input
        data-testid="chat_message-input"
        onChange={handleSetNewMessageValue}
        value={messageInputValue}
      />
      <button
        data-testid="chat__send-message-button"
        onClick={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
