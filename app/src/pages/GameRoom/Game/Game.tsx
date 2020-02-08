import React from 'react';
import { GameContainerProps } from './Game.container';
import Graveyard from './Graveyard/Graveyard';
import { PlayerColor } from '../../../interfaces/Game/Player';
import Board from './Board/Board';
import PromotionMenu from './PromotionMenu/PromotionMenu';
import styled from '@emotion/styled';
import GameOverMenu from './GameOverMenu/GameOverMenu';
import { GamePhase } from '../../../interfaces/Game/Game';
import Timer from './Timer/Timer';
import { Prompt } from 'react-router-dom';
import ForfeitGame from './ForfeitGame/ForfeitGame';

const StyledContainer = styled.div`
  margin: 0 auto;
`;

const StyledBoardContainer = styled.div`
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
  promotePawn,
  closeGame,
  userColor,
  forfeitGame,
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
        message="Are sure you want to leave the game??"
      />
      <ForfeitGame
        forfeitGame={forfeitGame}
        userColor={userColor}
        displayedFor={PlayerColor.Black}
      />
      <Timer
        isActive={
          currentTurn.turnNumber !== 0 &&
          currentTurn.currentPlayerColor === PlayerColor.Black &&
          gamePhase !== GamePhase.GAME_OVER
        }
        totalTurnTimeRemaining={
          players[PlayerColor.Black].totalTurnTimeRemaining
        }
      />
      <Graveyard pieces={graveyards.blackGraveyard} />
      <StyledBoardContainer>
        <Board
          boardState={gameState.board.state}
          getAvailableMoves={getAvailableMoves}
          availableMoves={availableMoves}
          makeMove={makeMove}
          selectedPosition={selectedPosition}
          checkState={checkState}
          currentPlayerColor={currentPlayerColor}
          userColor={userColor}
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
      </StyledBoardContainer>
      <Graveyard pieces={graveyards.whiteGraveyard} />
      <Timer
        isActive={
          currentTurn.turnNumber !== 0 &&
          currentTurn.currentPlayerColor === PlayerColor.White &&
          gamePhase !== GamePhase.GAME_OVER
        }
        totalTurnTimeRemaining={
          players[PlayerColor.White].totalTurnTimeRemaining
        }
      />

      <ForfeitGame
        forfeitGame={forfeitGame}
        userColor={userColor}
        displayedFor={PlayerColor.White}
      />
    </StyledContainer>
  );
};

export default Game;
