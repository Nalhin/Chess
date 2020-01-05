import axios from 'axios';

export const fetchIsGamePresent = (name: string) =>
  axios.get(`${process.env.BASE_API_URL}/game/is-game-present/${name}`);

export const fetchReconnectToGame = (gameId: string, name: string) =>
  axios.get(`${process.env.BASE_API_URL}/game/reconnect/${name}/${gameId}`);
