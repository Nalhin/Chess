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
import { Prompt } from 'react-router-dom';

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
  const currentPlayerColor = gameState.currentTurn.currentPlayerColor;
  const gamePhase = gameState.gamePhase;
  const isPromotionShown = positionAwaitingPromotion && isCurrentTurn;
  const players = gameState.players;
  const checkState = gameState.board.checkState;
  const currentTurn = gameState.currentTurn;
  return (
    <StyledContainer>
      <Prompt
        when={gamePhase !== GamePhase.GAME_OVER}
        message="Are sure you want to forfeit the game??"
      />
      <div>{error}</div>
      <div>
        {currentPlayerColor == PlayerColor.WHITE ? 'White turn' : 'Black turn'}
        <Timer
          isActive={
            currentTurn.turnNumber !== 0 &&
            currentTurn.currentPlayerColor === PlayerColor.WHITE
          }
          totalTurnTimeRemaining={
            players[PlayerColor.WHITE].totalTurnTimeRemaining
          }
        />
        <Timer
          isActive={currentTurn.currentPlayerColor === PlayerColor.BLACK}
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
        currentPlayerColor={currentPlayerColor}
      />
      <PromotionMenu
        isShown={isPromotionShown}
        playerColor={currentPlayerColor}
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
