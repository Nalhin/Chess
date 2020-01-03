import { ToasterContainerProps } from './Toasts.container';
import styled from '@emotion/styled';
import { Z_INDEX } from '../../styles/z-index';
import React from 'react';
import Toast from './Toast';

const StyledContainer = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  pointer-events: none;
  z-index: ${Z_INDEX.TOASTER};
`;

interface Props extends ToasterContainerProps {}

const Toasts: React.FC<Props> = ({ toastData, removeToast }) => {
  return (
    <StyledContainer>
      {toastData.map(toast => (
        <Toast
          onClose={removeToast}
          message={toast.message}
          id={toast.id}
          key={toast.id}
          type={toast.type}
        />
      ))}
    </StyledContainer>
  );
};

export default Toasts;
