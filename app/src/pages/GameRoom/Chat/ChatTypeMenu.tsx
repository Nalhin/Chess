import React from 'react';
import Input from '../../../components/Input/Input';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const StyledContainer = styled.div`
  border-top: 1px solid ${props => props.theme.colors.backgroundDarker};
  display: flex;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

interface Props {
  sendMessage: (content: string) => void;
}

const ChatTypeMenu: React.FC<Props> = ({ sendMessage }) => {
  const [messageInputValue, setMessageInputValue] = React.useState('');
  const theme = useTheme();

  const handleSetNewMessageValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMessageInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(messageInputValue);
    setMessageInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(messageInputValue);
      setMessageInputValue('');
    }
  };

  return (
    <StyledContainer theme={theme}>
      <StyledInput
        data-testid="chat_message-input"
        onChange={handleSetNewMessageValue}
        onKeyDown={handleKeyDown}
        value={messageInputValue}
        placeholder="Type a message..."
      />
      <IconButton
        data-testid="chat__send-message-button"
        onClick={handleSendMessage}
      >
        <SendIcon />
      </IconButton>
    </StyledContainer>
  );
};

export default ChatTypeMenu;
