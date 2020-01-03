import {
  AddToastAction,
  RemoveToastAction,
  ToasterActionTypes,
} from './toaster.types';
import { Toast } from '../../interfaces/ToastTypes';

export const addToast = (toast: Toast): AddToastAction => ({
  type: ToasterActionTypes.ADD_TOAST,
  toast,
});

export const removeToast = (id: string): RemoveToastAction => ({
  type: ToasterActionTypes.REMOVE_TOAST,
  id,
});
