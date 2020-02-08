import uniqueId from 'lodash/uniqueId';
import { Toast, ToastTypes } from '../interfaces/Toaster/ToastTypes';

export const generateToast = (message: string, type: ToastTypes): Toast => {
  return { message, type, id: uniqueId() };
};
