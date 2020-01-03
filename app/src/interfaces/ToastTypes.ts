export enum ToastTypes {
  SUCCESS,
  ERROR,
  INFO,
  WARNING,
}

export interface Toast {
  message: string;
  id: string;
  type: ToastTypes;
}
