import axios from 'axios';

export const fetchLoginUser = (name: string) =>
  axios.get(`${process.env.BASE_API_URL}/game/is-game-present`, {
    headers: { name },
  });

export const fetchReconnectToGame = (gameId: string, name: string) =>
  axios.get(`${process.env.BASE_API_URL}/game/reconnect/${gameId}`, {
    headers: { name },
  });
