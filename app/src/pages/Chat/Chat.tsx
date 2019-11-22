import * as React from 'react';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import { ChatContainerProps } from './Chat.container';

interface Props extends ChatContainerProps {}

const Chat: React.FC<Props> = ({
  chatMessages,
  sendMessage,
  initChat,
  user,
}) => {
  const [newMessageValue, setNewMessageValue] = React.useState('');

  React.useEffect(() => {
    initChat();
  }, [initChat]);

  const handleSetNewMessageValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewMessageValue(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessageValue);
  };

  return (
    <div>
      {chatMessages.map(message => (
        <ChatMessage key={message.sendDate} chatMessage={message} user={user} />
      ))}
      <input onChange={handleSetNewMessageValue} value={newMessageValue} />
      <button onClick={handleSendMessage} />
    </div>
  );
};

export default Chat;
