import * as React from 'react';
import ChatMessage from './ChatMessage/ChatMessage';
import { ChatContainerProps } from './Chat.container';
import styled from '@emotion/styled';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

const StyledChatContainer = styled.div`
  margin-right: auto;
  ${props => props.theme.mediaQueries.small} {
    margin: 0 auto;
  }
  padding: ${props => props.theme.space.large}px;
`;

const StyledMessageWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  height: 80%;
  max-height: 80vh;
  ${props => props.theme.mediaQueries.small} {
    height: 200px;
  }
`;

interface Props extends ChatContainerProps {}

const Chat: React.FC<Props> = ({ chatMessages, sendMessage, userLogin }) => {
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
    <StyledChatContainer>
      <StyledMessageWrapper>
        <div>
          {chatMessages.map(message => (
            <ChatMessage
              key={message.id}
              chatMessage={message}
              userLogin={userLogin}
            />
          ))}
        </div>
      </StyledMessageWrapper>
      <Input
        data-testid="chat_message-input"
        onChange={handleSetNewMessageValue}
        value={messageInputValue}
      />
      <Button
        data-testid="chat__send-message-button"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </StyledChatContainer>
  );
};

export default Chat;
