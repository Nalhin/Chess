import React from 'react';
import { GameContainerProps } from './Game.container';
import Graveyard from './Graveyard/Graveyard';
import { PlayerColor } from '../../../interfaces/player';
import Board from './Board/Board';
import PromotionMenu from './PromotionMenu/PromotionMenu';
import styled from '@emotion/styled';
import GameOverMenu from './GameOverMenu/GameOverMenu';
import { GamePhase } from '../../../interfaces/game';
import Timer from './Timer/Timer';

const StyledContainer = styled.div`
  position: relative;
`;

interface Props extends GameContainerProps {}

const Game: React.FC<Props> = ({
  gameState,
  getAvailableMoves,
  selectedPosition,
  availableMoves,
  makeMove,
  isCurrentTurn,
  error,
  promotePawn,
  closeGame,
}) => {
  const positionAwaitingPromotion = gameState.board.positionAwaitingPromotion;
  const graveyards = gameState.board.graveyards;
  const currentTurn = gameState.currentTurn;
  const gamePhase = gameState.gamePhase;
  const isPromotionShown = positionAwaitingPromotion && isCurrentTurn;
  const players = gameState.players;
  const checkState = gameState.board.checkState;
  return (
    <StyledContainer>
      <div>{error}</div>
      <div>
        {currentTurn == PlayerColor.WHITE ? 'White turn' : 'Black turn'}
        <Timer
          totalTurnTimeRemaining={
            players[PlayerColor.WHITE].totalTurnTimeRemaining
          }
        />
        <Timer
          totalTurnTimeRemaining={
            players[PlayerColor.BLACK].totalTurnTimeRemaining
          }
        />
      </div>
      <Graveyard pieces={graveyards.blackGraveyard} />
      <Board
        boardState={gameState.board.state}
        getAvailableMoves={getAvailableMoves}
        availableMoves={availableMoves}
        makeMove={makeMove}
        selectedPosition={selectedPosition}
        checkState={checkState}
        currentTurn={currentTurn}
      />
      <PromotionMenu
        isShown={isPromotionShown}
        playerColor={currentTurn}
        positionAwaitingPromotion={positionAwaitingPromotion}
        promotePawn={promotePawn}
      />
      <GameOverMenu
        isShown={gamePhase === GamePhase.GAME_OVER}
        closeGame={closeGame}
      />
      <Graveyard pieces={graveyards.whiteGraveyard} />
    </StyledContainer>
  );
};

export default Game;
