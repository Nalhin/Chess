import { Reducer } from 'redux';
import { LocationChangeAction } from 'connected-react-router';
import { CustomRouterState } from './router.types';
import produce from 'immer';

export const INITIAL_ROUTER_STATE: CustomRouterState = {
  previousLocations: [],
};

const customRouterReducer: Reducer<CustomRouterState, LocationChangeAction> = (
  state = INITIAL_ROUTER_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@@router/LOCATION_CHANGE':
        draft.previousLocations.push(action.payload.location);
        break;
      default:
        break;
    }
  });
};

export default customRouterReducer;
