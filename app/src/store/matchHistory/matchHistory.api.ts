import axios from 'axios';

export const fetchGetMatchHistory = (login: string) =>
  axios.get(`${process.env.BASE_API_URL}/history/games/${login}`);

export const fetchGetMatchDetails = (id: string) =>
  axios.get(`${process.env.BASE_API_URL}/history/game/${id}`);
