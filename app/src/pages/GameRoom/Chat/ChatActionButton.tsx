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
  isOpen: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  messageCount: number;
}

const ChatActionButton: React.FC<Props> = ({
  isOpen,
  handleClick,
  messageCount,
}) => {
  const unreadMessagesCount = useUnreadMessagesCount(messageCount, !isOpen);
  const theme = useTheme();
  return (
    <Fade in={isOpen}>
      <StyledFab onClick={handleClick} color="secondary" theme={theme}>
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
