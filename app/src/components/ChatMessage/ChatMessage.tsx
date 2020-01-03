import React from 'react';
import { ChatMessageType } from '../../interfaces/chatMessageType';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import { isoDateToSecondsMinutesAndHours } from '../../../test/utils/isoDateToSecondsMinutesAndHours';
import PlayerAvatar from '../PlayerAvatar/PlayerAvatar';

interface StyledMessageProps {
  isSender: boolean;
}

const StyledMessage = styled.div<StyledMessageProps>`
  background: ${props =>
    props.isSender
      ? props.theme.colors.primary
      : props.theme.colors.textSecondary};
  color: ${props => props.theme.colors.textPrimary};
  border-radius: 20px;
  padding: ${props => props.theme.space.medium}px;
  align-items: center;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledHeaderWrapper = styled.div``;

const StyledPlayerAvatar = styled(PlayerAvatar)`
  width: 30px;
  height: 30px;
`;

interface Props {
  chatMessage: ChatMessageType;
  userLogin: string;
}

const ChatMessage: React.FC<Props> = ({ chatMessage, userLogin }) => {
  const { sendDate, content, sender } = chatMessage;

  const isSender = sender === userLogin;
  const theme = useTheme();
  return (
    <StyledHeaderWrapper>
      <div>{isoDateToSecondsMinutesAndHours(sendDate)}</div>
      <StyledContainer>
        {sender && (
          <StyledPlayerAvatar name={sender} isThumbnail>
            {sender[0].toUpperCase()}
          </StyledPlayerAvatar>
        )}

        <StyledMessage
          data-testid="chat__chat-message"
          isSender={isSender}
          theme={theme}
        >
          <div>{content}</div>
        </StyledMessage>
      </StyledContainer>
    </StyledHeaderWrapper>
  );
};

export default ChatMessage;
