import React from 'react';
import { GameContainerProps } from './Game.container';
import { PlayerColor } from '../../../interfaces/Game/Player';
import Board from './Board/Board';
import PromotionMenu from './PromotionMenu/PromotionMenu';
import styled from '@emotion/styled';
import GameOverMenu from './GameOverMenu/GameOverMenu';
import { GamePhase } from '../../../interfaces/Game/Game';
import { Prompt } from 'react-router-dom';
import ForfeitGame from './ForfeitGame/ForfeitGame';
import GraveyardMenu from './Graveyard/GraveyardMenu';
import PlayerPanel from './PlayerPanel/PlayerPanel';
import { isPlayerActive } from '../../../utils/isPlayerActive';

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
      <PlayerPanel
        player={players[PlayerColor.Black]}
        isActive={isPlayerActive(currentTurn, gamePhase, PlayerColor.Black)}
      />
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
          latestMove={gameState.latestMove}
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
          isWinner={!isCurrentTurn}
        />
      </StyledBoardContainer>
      <PlayerPanel
        player={players[PlayerColor.White]}
        isActive={isPlayerActive(currentTurn, gamePhase, PlayerColor.White)}
      />
      <ForfeitGame forfeitGame={forfeitGame} />
      <GraveyardMenu graveyards={graveyards} userColor={userColor} />
    </StyledContainer>
  );
};

export default Game;
