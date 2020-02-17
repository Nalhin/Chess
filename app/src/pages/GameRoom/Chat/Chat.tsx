import React from 'react';
import ChatUserMessage from './ChatUserMessage';
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
    flex-direction: column;
    height: 300px;
    width: 300px;
    overflow: auto;
    white-space: pre-line;

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

const StyledInner = styled.div`
  ${props => `
    display: flex;
    flex-direction: column-reverse;
    flex-grow: 1;
    padding: 0 ${props.theme.spacing(2)}px ${props.theme.spacing(2)}px;
  `}
`;

interface Props extends ChatContainerProps {}

const Chat: React.FC<Props> = ({ chatMessages, sendMessage, userLogin }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const ref = React.useRef(null);
  const theme = useTheme();

  React.useEffect(() => {
    if (ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      const maxScrollTop = scrollHeight - clientHeight;
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [chatMessages.length]);

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
        id="chat-menu"
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
          <StyledMessageWrapper theme={theme} ref={ref}>
            <StyledInner theme={theme}>
              {chatMessages.map(message => (
                <ChatUserMessage
                  key={message.id}
                  chatMessage={message}
                  userLogin={userLogin}
                />
              ))}
            </StyledInner>
          </StyledMessageWrapper>
          <ChatTypeMenu sendMessage={sendMessage} />
        </StyledContentWrapper>
      </StyledChatWrapper>
      <ChatActionButton
        messageCount={chatMessages.length}
        isDisplayed={!isOpen}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Chat;
