import { ToastTypes } from '../../interfaces/Toaster/ToastTypes';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import React from 'react';
import MdSnackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

interface AlertSeverityTypes {
  [key: string]: 'success' | 'error' | 'info' | 'warning';
}

const AlertTypes: AlertSeverityTypes = {
  [ToastTypes.Success]: 'success',
  [ToastTypes.Error]: 'error',
  [ToastTypes.Info]: 'info',
  [ToastTypes.Warning]: 'warning',
};

const StyledToast = styled(MdSnackbar)`
  pointer-events: all;
  position: unset;
  transform: none;
  margin: ${props => props.theme.spacing(1)}px;
  user-select: none;
  font-size: ${props => props.theme.typography.body1.fontSize}px;
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

  return (
    <StyledToast
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      theme={theme}
      open
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
    >
      <Alert onClose={handleClose} severity={AlertTypes[type]} variant="filled">
        {message}
      </Alert>
    </StyledToast>
  );
};

export default Toast;
