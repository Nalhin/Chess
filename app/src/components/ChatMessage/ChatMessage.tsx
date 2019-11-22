import * as React from 'react';
import { ChatMessage } from '../../inferfaces/chatMessage';
import styled from '@emotion/styled';

interface StyledMessageProps {
  isSender: boolean;
}

const StyledMessage = styled.div`
  ${(props: StyledMessageProps) => props.isSender && 'background:yellow'}
`;

interface Props {
  chatMessage: ChatMessage;
  user: string;
}

const ChatMessage: React.FC<Props> = ({ chatMessage, user }) => {
  const { sendDate, content, sender } = chatMessage;

  const isSender = sender === user;
  return (
    <StyledMessage isSender={isSender}>
      <div>{content}</div>
      <div>{sendDate}</div>
      <div>{sender}</div>
    </StyledMessage>
  );
};

export default ChatMessage;
