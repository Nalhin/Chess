import React from 'react';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import { PlayerColor } from '../../interfaces/Game/Player';
import { getPieceUrl } from '../../utils/getPieceUrl';
import ChessMove from '../../components/ChessMove/ChessMove';
import { GameTurn } from '../../interfaces/MatchHistoryGame/GameTurn';
import styled from '@emotion/styled';
import PlayerAvatar from '../../components/PlayerAvatar/PlayerAvatar';

const StyledPlayerAvatar = styled(PlayerAvatar)`
  width: 50px;
  height: 50px;
  margin-left: ${props => props.theme.spacing(3)}px;
  ${props => props.theme.breakpoints.down('sm')} {
    width: 40px;
    height: 40px;
  }
`;

const StyledImage = styled.img`
  width: 85px;
  height: 85px;
  margin-left: ${props => props.theme.spacing(3)}px;
  ${props => props.theme.breakpoints.down('sm')} {
    width: 60px;
    height: 60px;
  }
`;

const StyledTurn = styled(ListItem)`
  padding: ${props => props.theme.spacing(1)}px;
`;

const StyledDivider = styled(Divider)`
  margin: 0;
`;

const StyledListItemText = styled(ListItemText)`
  flex: none;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  margin-left: auto;
`;

interface Props {
  turn: GameTurn;
  whitePlayer: string;
  blackPlayer: string;
}

const MatchDetailsTurn: React.FC<Props> = ({
  turn,
  whitePlayer,
  blackPlayer,
}) => {
  const theme = useTheme();

  return (
    <li>
      <StyledTurn button theme={theme}>
        <span>{turn.turnNumber}.</span>
        <ListItemIcon>
          <StyledPlayerAvatar
            theme={theme}
            name={
              turn.playerColor === PlayerColor.White ? whitePlayer : blackPlayer
            }
          />
        </ListItemIcon>
        <StyledListItemIcon>
          <StyledImage
            theme={theme}
            src={getPieceUrl(turn.playerColor, turn.pieceType)}
            alt={`${turn.pieceType} ${turn.playerColor}`}
          />
        </StyledListItemIcon>
        <StyledListItemText
          primary={
            <ChessMove
              initialPosition={turn.initialPosition}
              destinationPosition={turn.destinationPosition}
            />
          }
        />
      </StyledTurn>
      <StyledDivider variant="middle" />
    </li>
  );
};

export default MatchDetailsTurn;
