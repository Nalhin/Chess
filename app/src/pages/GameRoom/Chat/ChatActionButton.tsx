import React from 'react';
import { Badge, Fade } from '@material-ui/core';
import SmsIcon from '@material-ui/icons/Sms';
import styled from '@emotion/styled';
import Fab from '@material-ui/core/Fab';
import { useUnreadMessagesCount } from './useUnreadMessagesCount';

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: ${props => props.theme.space.medium}px;
  right: ${props => props.theme.space.medium}px;
  background: ${props => props.theme.colors.secondary};
  &:hover {
    background: ${props => props.theme.colors.secondaryHover};
  }
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

  return (
    <Fade in={isOpen}>
      <StyledFab onClick={handleClick}>
        <Badge
          color="secondary"
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
