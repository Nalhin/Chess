import axios from 'axios';

export const fetchGetMatchHistory = (login: string) =>
  axios.get(`${process.env.BASE_API_URL}/history/games/${login}`);

export const fetchGetMatchDetails = (id: number) =>
  axios.get(`${process.env.BASE_API_URL}/history/game/${id}`);
