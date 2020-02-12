import {
  ToasterActions,
  ToasterActionTypes,
  ToasterState,
} from './toaster.types';
import { Reducer } from 'react';
import produce from 'immer';

export const TOASTER_INITIAL_STATE: ToasterState = {
  toasterData: [],
};

const toasterReducer: Reducer<ToasterState, ToasterActions> = (
  state = TOASTER_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ToasterActionTypes.ADD_TOAST:
        draft.toasterData.push(action.toast);
        break;
      case ToasterActionTypes.REMOVE_TOAST:
        draft.toasterData = draft.toasterData.filter(
          snackbar => snackbar.id !== action.id,
        );
        break;
    }
  });
};

export default toasterReducer;
