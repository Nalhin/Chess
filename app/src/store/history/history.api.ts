import axios from 'axios';

export const fetchGetGamesByLogin = (login: string) =>
  axios.get(`${process.env.BASE_API_URL}/history/games/${login}`);

export const fetchGetGameById = (id: string) =>
  axios.get(`${process.env.BASE_API_URL}/history/game/${id}`);
