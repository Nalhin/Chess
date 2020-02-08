export enum ToastTypes {
  Success,
  Error,
  Info,
  Warning,
}

export interface Toast {
  message: string;
  id: string;
  type: ToastTypes;
}
