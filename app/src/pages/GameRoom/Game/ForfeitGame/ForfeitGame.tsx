import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Portal,
  useMediaQuery,
  useTheme,
  Zoom,
} from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const StyledFabContainer = styled.div`
  position: fixed;
  transform: none;
  left: ${props => props.theme.spacing(10)}px;
  bottom: ${props => props.theme.spacing(2.25)}px;
  ${props => props.theme.breakpoints.down('sm')} {
    left: calc(50% - ${props => props.theme.spacing(6)}px);
    bottom: ${props => props.theme.spacing(3)}px;
  }
`;
interface Props {
  forfeitGame: () => void;
}

const ForfeitGame: React.FC<Props> = ({ forfeitGame }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => {
    setDialogOpen(!isDialogOpen);
  };

  const handleForfeit = () => {
    forfeitGame();
    handleClose();
  };

  const size = isMobile ? 'small' : 'medium';

  return (
    <>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Forfeit?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to forfeit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForfeit} color="primary" variant="contained">
            Yes
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Portal>
        <StyledFabContainer theme={theme}>
          <Zoom in={true} unmountOnExit>
            <Fab
              color="secondary"
              onClick={handleClose}
              size={size}
              aria-label="forfeit game"
            >
              <MeetingRoomIcon />
            </Fab>
          </Zoom>
        </StyledFabContainer>
      </Portal>
    </>
  );
};

export default ForfeitGame;
