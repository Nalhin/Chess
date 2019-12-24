import React from 'react';
import { ChatMessageType } from '../../interfaces/chatMessageType';
import styled from '@emotion/styled';

interface StyledMessageProps {
  isSender: boolean;
}

const StyledMessage = styled.div`
  ${(props: StyledMessageProps) => props.isSender && 'background:yellow'}
`;

interface Props {
  chatMessage: ChatMessageType;
  user: string;
}

const ChatMessage: React.FC<Props> = ({ chatMessage, user }) => {
  const { sendDate, content, sender } = chatMessage;

  const isSender = sender === user;
  return (
    <StyledMessage data-testid="chat__chat-message" isSender={isSender}>
      <div>{content}</div>
      <div>{sendDate}</div>
      <div>{sender}</div>
    </StyledMessage>
  );
};

export default ChatMessage;
