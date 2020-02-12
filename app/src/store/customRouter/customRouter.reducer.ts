import { Reducer } from 'redux';
import {
  CustomRouterActions,
  CustomRouterActionTypes,
  CustomRouterState,
} from './customRouter.types';
import produce from 'immer';

export const CUSTOM_ROUTER_INITIAL_STATE: CustomRouterState = {
  previousLocations: [],
};

const customRouterReducer: Reducer<CustomRouterState, CustomRouterActions> = (
  state = CUSTOM_ROUTER_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case CustomRouterActionTypes.LOCATION_CHANGE:
        draft.previousLocations.push(action.payload.location);
        break;
      default:
        break;
    }
  });
};

export default customRouterReducer;
