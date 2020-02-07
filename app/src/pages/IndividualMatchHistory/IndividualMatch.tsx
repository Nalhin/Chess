import React from 'react';
import { HistoryGameWithTurns } from '../../interfaces/HistoryGame';
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import styled from '@emotion/styled';
import MatchHistoryPlayer from '../../components/MatchHistoryPlayer/MatchHistoryPlayer';
import { PlayerColor } from '../../interfaces/player';
import { StyledWrapper } from '../SignIn/SignIn';
import { useTheme } from '@emotion/core';
import { getPieceUrl } from '../../utils/getPieceUrl';
import PlayerAvatar from '../../components/PlayerAvatar/PlayerAvatar';
import ChessMove from '../../components/ChessMove/ChessMove';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const StyledCard = styled(Card)`
  max-width: 90%;
  margin: 0 auto;
  padding: ${props => props.theme.space.large}px;
  width: 500px;
`;

const StyledTurn = styled(ListItem)`
  padding: 0;
`;

const StyledBlackPlayer = styled(MatchHistoryPlayer)`
  margin-left: auto;
  flex-direction: row-reverse;
`;

const StyledGameTimeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.heading};
  flex-direction: column;
`;

const StyledDateContainer = styled.div`
  font-size: ${props => props.theme.fontSizes.small}px;
  text-align: right;
  font-weight: ${props => props.theme.fontWeights.heading};
  margin-bottom: ${props => props.theme.space.large}px;
`;

const StyledPlayerAvatar = styled(PlayerAvatar)`
  width: 50px;
  height: 50px;
  margin-left: ${props => props.theme.space.large}px;
  ${props => props.theme.mediaQueries.small} {
    width: 40px;
    height: 40px;
  }
`;

const StyledImage = styled.img`
  width: 85px;
  height: 85px;
  margin-left: ${props => props.theme.space.large}px;
  ${props => props.theme.mediaQueries.small} {
    width: 60px;
    height: 60px;
  }
`;

interface Props {
  game: HistoryGameWithTurns;
}

const IndividualMatch: React.FC<Props> = ({ game }) => {
  const theme = useTheme();
  return (
    <StyledCard>
      <StyledDateContainer>
        {dayjs(game.finishTime).from(dayjs())}
      </StyledDateContainer>
      <StyledWrapper>
        <MatchHistoryPlayer
          name={game.whitePlayerName}
          isWinner={game.winner === PlayerColor.WHITE}
        />
        <StyledGameTimeContainer theme={theme}>
          <span>{game.turns.length} Turns</span>
          <span>{game.duration} s</span>
        </StyledGameTimeContainer>
        <StyledBlackPlayer
          name={game.blackPlayerName}
          isWinner={game.winner === PlayerColor.BLACK}
        />
      </StyledWrapper>
      <List>
        {game.turns.map(turn => (
          <>
            <StyledTurn key={turn.turnId} button>
              <span>{turn.turnNumber}.</span>
              <ListItemIcon>
                <StyledPlayerAvatar
                  name={
                    turn.playerColor === PlayerColor.WHITE
                      ? game.whitePlayerName
                      : game.blackPlayerName
                  }
                />
              </ListItemIcon>
              <ListItemIcon>
                <StyledImage
                  src={`/assets/images/chess/${getPieceUrl(
                    turn.playerColor,
                    turn.pieceType,
                  )}.png`}
                  alt={`${turn.pieceType} ${turn.playerColor}`}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <ChessMove
                    initialPosition={turn.initialPosition}
                    destinationPosition={turn.destinationPosition}
                  />
                }
              />
            </StyledTurn>
            <Divider variant="middle" component="li" />
          </>
        ))}
      </List>
    </StyledCard>
  );
};

export default IndividualMatch;
