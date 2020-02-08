import { Toast } from '../../interfaces/Toaster/ToastTypes';

export interface ToasterState {
  readonly toasterData: Toast[];
}

export enum ToasterActionTypes {
  ADD_TOAST = 'ADD_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST',
}

export interface AddToastAction {
  type: typeof ToasterActionTypes.ADD_TOAST;
  toast: Toast;
}

export interface RemoveToastAction {
  type: typeof ToasterActionTypes.REMOVE_TOAST;
  id: string;
}

export type ToasterActions = AddToastAction | RemoveToastAction;
