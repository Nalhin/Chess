import { AxiosError } from 'axios';

export const generateErrorMessage = (error: AxiosError): string => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'Unexpected error';
};
