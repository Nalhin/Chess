import { ToastTypes } from '../../interfaces/ToastTypes';
import styled from '@emotion/styled';
import { IconButton, SnackbarContent } from '@material-ui/core';
import { TOAST_COLORS } from '../../styles/toaster';
import React from 'react';
import MdSnackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

const ToastIcon = {
  [ToastTypes.SUCCESS]: CheckCircleIcon,
  [ToastTypes.ERROR]: ErrorIcon,
  [ToastTypes.INFO]: InfoIcon,
  [ToastTypes.WARNING]: WarningIcon,
};

type StyledToastProps = {
  type: ToastTypes;
};

const StyledToast = styled(MdSnackbar)`
  pointer-events: all;
  position: unset;
  transform: none;
  margin: ${props => props.theme.space.large}px;
  user-select: none;
  font-size: ${props => props.theme.fontSizes.larger}px;
`;

const StyledToastMessageContainer = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 0;
  > svg {
    font-size: ${props => props.theme.fontSizes.larger}px;
  }
`;

const StyledToastMessage = styled.span`
  padding-left: ${props => props.theme.space.large}px;
`;

const StyledToastContent = styled(SnackbarContent)`
  background: ${(props: StyledToastProps) => TOAST_COLORS[props.type]};
`;

interface ToastProps {
  onClose: (id: string) => void;
  message: string;
  id: string;
  type: ToastTypes;
}

const autoHideDuration = 5000;

const Toast: React.FC<ToastProps> = ({ onClose, message, id, type }) => {
  const handleClose = React.useCallback(() => onClose(id), [id]);
  const Icon = ToastIcon[type];

  return (
    <StyledToast
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
    >
      <StyledToastContent
        type={type}
        action={[
          <IconButton
            color="inherit"
            onClick={handleClose}
            key={id}
            data-testid="toast__close-icon"
          >
            <CloseIcon />
          </IconButton>,
        ]}
        message={
          <StyledToastMessageContainer>
            <Icon />
            <StyledToastMessage>{message}</StyledToastMessage>
          </StyledToastMessageContainer>
        }
        data-testid="toast__content"
      />
    </StyledToast>
  );
};

export default Toast;
