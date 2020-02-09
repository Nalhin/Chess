import axios from 'axios';

export const fetchJoinQueueAi = (name: string) =>
  axios.post(`${process.env.BASE_API_URL}/queue/with-ai`, { name });
