import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Badge, Fab, Fade, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledFab = styled(Fab)`
  ${props => `
    position: fixed;
    bottom: ${props.theme.spacing(2)}px;
    left: ${props.theme.spacing(2)}px;
  `}
`;

interface Props {
  handleClick: () => void;
  numberOfOwnPiecesInGraveyard: number;
}

const GraveyardActionButton: React.FC<Props> = ({
  handleClick,
  numberOfOwnPiecesInGraveyard,
}) => {
  const theme = useTheme();
  return (
    <Fade in={true}>
      <StyledFab onClick={handleClick} color="secondary" theme={theme}>
        <Badge
          color="primary"
          badgeContent={numberOfOwnPiecesInGraveyard}
          showZero={false}
        >
          <DeleteIcon />
        </Badge>
      </StyledFab>
    </Fade>
  );
};

export default GraveyardActionButton;
