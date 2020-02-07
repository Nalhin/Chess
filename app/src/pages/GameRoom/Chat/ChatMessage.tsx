import React from 'react';
import { ChatMessageType } from '../../../interfaces/chatMessageType';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/core';
import PlayerAvatar from '../../../components/PlayerAvatar/PlayerAvatar';
import dayjs from 'dayjs';

interface StyledMessageProps {
  isSender: boolean;
}

const StyledMessage = styled.div<StyledMessageProps>`
  background: ${props =>
    props.isSender
      ? props.theme.colors.primary
      : props.theme.colors.backgroundDarker};
  color: ${props => (props.isSender ? '#fff' : '#000')};
  border-radius: 20px;
  padding: ${props => props.theme.space.medium}px;
  align-items: center;
  word-wrap: break-word;
  overflow: auto;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledPlayerAvatar = styled(PlayerAvatar)`
  width: 30px;
  height: 30px;
  margin-right: ${props => props.theme.space.medium}px;
`;

const StyledSendDate = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.small}px;
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
    <div>
      {sendDate && (
        <StyledSendDate>{dayjs(sendDate).format('HH:mm:ss')}</StyledSendDate>
      )}
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
          {content}
        </StyledMessage>
      </StyledContainer>
    </div>
  );
};

export default ChatMessage;
