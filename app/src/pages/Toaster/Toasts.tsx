import { ToasterContainerProps } from './Toasts.container';
import styled from '@emotion/styled';
import React from 'react';
import Toast from './Toast';
import { Portal, useTheme } from '@material-ui/core';

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
  z-index: ${props => props.theme.zIndex.snackbar};
`;

interface Props extends ToasterContainerProps {}

const Toasts: React.FC<Props> = ({ toastData, removeToast }) => {
  const theme = useTheme();
  return (
    <Portal>
      <StyledContainer theme={theme}>
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
    </Portal>
  );
};

export default Toasts;
