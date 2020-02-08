import React from 'react';
import ChatMessage from './ChatMessage';
import { ChatContainerProps } from './Chat.container';
import styled from '@emotion/styled';
import ChatTypeMenu from './ChatTypeMenu';
import { Popover, useTheme } from '@material-ui/core';
import ChatActionButton from './ChatActionButton';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const StyledChatWrapper = styled(Popover)`
  display: flex;
  border-radius: 8px;
  pointer-events: none;
`;

const StyledMessageWrapper = styled.div`
  ${props => `
    display: flex;
    flex-direction: column-reverse;
    height: 300px;
    width: 300px;
    overflow-x: auto;
    padding: 0 ${props.theme.spacing(2)}px
    ${props.theme.spacing(2)}px;
    ${props.theme.breakpoints.down('sm')} {
      height: 200px;
    }
  `}
`;

const StyledContentWrapper = styled.div`
  pointer-events: all;
`;

const StyledTitle = styled.div`
  ${props => `
    background: ${props.theme.palette.primary.main};
    text-align: center;
    font-size: ${props.theme.typography.h5.fontSize};
    font-weight: ${props.theme.typography.h5.fontWeight};
    color: #fff;
    padding: ${props.theme.spacing(1) * 1.3}px 0;
    position: relative;
  `}
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
`;

interface Props extends ChatContainerProps {}

const Chat: React.FC<Props> = ({ chatMessages, sendMessage, userLogin }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  return (
    <div>
      <StyledChatWrapper
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <StyledContentWrapper>
          <StyledTitle theme={theme}>
            <div>Chat</div>
            <StyledIconButton onClick={handleClose}>
              <CloseIcon />
            </StyledIconButton>
          </StyledTitle>
          <StyledMessageWrapper theme={theme}>
            {chatMessages.map(message => (
              <ChatMessage
                key={message.id}
                chatMessage={message}
                userLogin={userLogin}
              />
            ))}
          </StyledMessageWrapper>
          <ChatTypeMenu sendMessage={sendMessage} />
        </StyledContentWrapper>
      </StyledChatWrapper>
      <ChatActionButton
        messageCount={chatMessages.length}
        isOpen={!isOpen}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Chat;
