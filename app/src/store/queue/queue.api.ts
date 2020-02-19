import axios from 'axios';

export const fetchJoinQueueAi = (login: string) =>
  axios.post(`${process.env.BASE_API_URL}/queue/with-ai`, { login });
