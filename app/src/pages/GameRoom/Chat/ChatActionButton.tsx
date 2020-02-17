import React from 'react';
import { Badge, Fade, useTheme } from '@material-ui/core';
import SmsIcon from '@material-ui/icons/Sms';
import styled from '@emotion/styled';
import Fab from '@material-ui/core/Fab';
import { useUnreadMessagesCount } from './useUnreadMessagesCount';

const StyledFab = styled(Fab)`
  ${props => `
    position: fixed;
    bottom: ${props.theme.spacing(2)}px;
    right: ${props.theme.spacing(2)}px;
  `}
`;

interface Props {
  isDisplayed: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  messageCount: number;
}

const ChatActionButton: React.FC<Props> = ({
  isDisplayed,
  handleClick,
  messageCount,
}) => {
  const unreadMessagesCount = useUnreadMessagesCount(
    messageCount,
    !isDisplayed,
  );
  const theme = useTheme();
  return (
    <Fade in={isDisplayed}>
      <StyledFab
        onClick={handleClick}
        color="secondary"
        theme={theme}
        aria-label="toggle chat"
      >
        <Badge
          color="primary"
          badgeContent={unreadMessagesCount}
          showZero={false}
        >
          <SmsIcon />
        </Badge>
      </StyledFab>
    </Fade>
  );
};

export default ChatActionButton;
