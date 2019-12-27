import { UserLoginData, UserRegisterData } from '../../interfaces/User';
import axios from 'axios';

export const fetchLoginUser = (user: UserLoginData) =>
  axios.post(`${process.env.AUTHENTICATION_URL}/authentication/login`, user);

export const fetchRegisterUser = (user: UserRegisterData) =>
  axios.post(`${process.env.AUTHENTICATION_URL}/authentication/register`, user);
