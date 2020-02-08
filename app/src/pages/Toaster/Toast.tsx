import { ToastTypes } from '../../interfaces/ToastTypes';
import styled from '@emotion/styled';
import { IconButton, SnackbarContent, useTheme } from '@material-ui/core';
import React from 'react';
import MdSnackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import mixins from '../../styles/mixins';

const ToastIcon = {
  [ToastTypes.SUCCESS]: CheckCircleIcon,
  [ToastTypes.ERROR]: ErrorIcon,
  [ToastTypes.INFO]: InfoIcon,
  [ToastTypes.WARNING]: WarningIcon,
};

const StyledToast = styled(MdSnackbar)`
  pointer-events: all;
  position: unset;
  transform: none;
  margin: ${props => props.theme.spacing(2)}px;
  user-select: none;
  font-size: ${props => props.theme.typography.body1.fontSize}px;
`;

const StyledToastMessageContainer = styled.span`
  ${mixins.flexCenter};
  line-height: 0;
  > svg {
    font-size: ${props => props.theme.typography.body1.fontSize}px;
  }
`;

const StyledToastMessage = styled.span`
  padding-left: ${props => props.theme.spacing(3)}px;
`;

interface StyledToastProps {
  type: ToastTypes;
}

const StyledToastContent = styled(SnackbarContent)<StyledToastProps>`
  background: ${props => {
    switch (props.type) {
      case ToastTypes.SUCCESS:
        return props.theme.palette.success.main;
      case ToastTypes.ERROR:
        return props.theme.palette.error.main;
      case ToastTypes.INFO:
        return props.theme.palette.info.main;
      case ToastTypes.WARNING:
        return props.theme.palette.warning.main;
    }
  }};
`;

interface ToastProps {
  onClose: (id: string) => void;
  message: string;
  id: string;
  type: ToastTypes;
}

const autoHideDuration = 3000;

const Toast: React.FC<ToastProps> = ({ onClose, message, id, type }) => {
  const theme = useTheme();
  const handleClose = React.useCallback(() => onClose(id), [id]);
  const Icon = ToastIcon[type];

  return (
    <StyledToast
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      theme={theme}
      open
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
    >
      <StyledToastContent
        theme={theme}
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
          <StyledToastMessageContainer theme={theme}>
            <Icon />
            <StyledToastMessage theme={theme}>{message}</StyledToastMessage>
          </StyledToastMessageContainer>
        }
        data-testid="toast__content"
      />
    </StyledToast>
  );
};

export default Toast;
