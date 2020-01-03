import { UserLoginData, UserRegisterData } from '../../interfaces/User';
import axios from 'axios';

export const fetchLoginUser = (user: UserLoginData) =>
  axios.post(`${process.env.BASE_API_URL}/authentication/login`, user);

export const fetchRegisterUser = (user: UserRegisterData) =>
  axios.post(`${process.env.BASE_API_URL}/authentication/register`, user);

export const fetchAuthenticateUser = (token: string) =>
  axios.get(`${process.env.BASE_API_URL}/authentication/authorize`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchSaveImage = (formData: FormData, token: string) =>
  axios.post(
    `${process.env.BASE_API_URL}/authentication/save-image`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
