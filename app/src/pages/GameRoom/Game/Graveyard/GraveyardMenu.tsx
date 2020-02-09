import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from '@material-ui/core';
import Graveyard from './Graveyard';
import GraveyardActionButton from './GraveyardActionButton';
import { Graveyards } from '../../../../interfaces/Game/Game';
import { PlayerColor } from '../../../../interfaces/Game/Player';
import CloseIcon from '@material-ui/icons/Close';
import styled from '@emotion/styled';

const StyledDialogTitle = styled(DialogTitle)`
  min-width: 240px;
`;

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  right: ${props => props.theme.spacing(1)}px;
  top: ${props => props.theme.spacing(1)}px;
`;

const StyledGraveyard = styled(Graveyard)`
  padding-top: ${props => props.theme.spacing(1)}px;
`;

interface Props {
  graveyards: Graveyards;
  userColor: PlayerColor;
}

const GraveyardMenu: React.FC<Props> = ({ userColor, graveyards }) => {
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState(false);
  const handleChange = () => {
    setOpen(!isOpen);
  };

  const userGraveyard =
    userColor === PlayerColor.Black
      ? graveyards.blackGraveyard
      : graveyards.whiteGraveyard;

  const oppositeGraveyard =
    userColor === PlayerColor.Black
      ? graveyards.whiteGraveyard
      : graveyards.blackGraveyard;

  return (
    <div>
      <GraveyardActionButton
        handleClick={handleChange}
        numberOfOwnPiecesInGraveyard={userGraveyard.length}
      />
      <Dialog onClose={handleChange} open={isOpen}>
        <StyledDialogTitle>
          <Typography variant="h6">Graveyards</Typography>
          <StyledCloseButton
            aria-label="close"
            onClick={handleChange}
            theme={theme}
          >
            <CloseIcon />
          </StyledCloseButton>
        </StyledDialogTitle>
        <DialogContent dividers>
          <Graveyard
            pieces={oppositeGraveyard}
            description={"Opponent's graveyard"}
          />
          <StyledGraveyard
            pieces={userGraveyard}
            description={'Your graveyard'}
            theme={theme}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GraveyardMenu;
