import React from 'react';
import {
  ChatMessage,
  ChatMessageTypes,
} from '../../../interfaces/Chat/ChatMessage';
import styled from '@emotion/styled';
import PlayerAvatar from '../../../components/PlayerAvatar/PlayerAvatar';
import dayjs from 'dayjs';
import { Typography, useTheme } from '@material-ui/core';
import { css } from '@emotion/core';

interface StyledMessageProps {
  isSender: boolean;
}

const StyledMessageText = styled.div<StyledMessageProps>`
  ${props => css`
    background: ${props.isSender
      ? props.theme.palette.primary.main
      : props.theme.palette.divider};
    color: ${props.isSender ? '#fff' : props.theme.palette.text.primary};
    border-radius: 20px;
    padding: ${props.theme.spacing(1)}px;
    align-items: center;
    word-wrap: break-word;
    overflow: auto;
  `}
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: auto;
`;

const StyledPlayerAvatar = styled(PlayerAvatar)`
  width: 30px;
  height: 30px;
  margin-right: ${props => props.theme.spacing(1)}px;
`;

interface Props {
  chatMessage: ChatMessage;
  userLogin: string;
}

const ChatUserMessage: React.FC<Props> = ({ chatMessage, userLogin }) => {
  const theme = useTheme();
  const { sendDate, content, sender, type } = chatMessage;
  const isSender = sender === userLogin;
  const shouldShowAvatar = sender && type != ChatMessageTypes.InfoMessage;
  return (
    <div>
      {sendDate && (
        <Typography variant="subtitle2" color="textSecondary">
          {dayjs(sendDate).format('HH:mm:ss')}
        </Typography>
      )}
      <StyledContainer>
        {shouldShowAvatar && (
          <StyledPlayerAvatar theme={theme} name={sender} isThumbnail>
            {sender[0].toUpperCase()}
          </StyledPlayerAvatar>
        )}
        <StyledMessageText isSender={isSender} theme={theme}>
          {content}
        </StyledMessageText>
      </StyledContainer>
    </div>
  );
};

export default ChatUserMessage;
