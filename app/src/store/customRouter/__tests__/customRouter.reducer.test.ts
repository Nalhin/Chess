import customRouterReducer, {
  CUSTOM_ROUTER_INITIAL_STATE,
} from '../customRouter.reducer';
import produce from 'immer';
import { mockLocation } from '../../../../test/fixtures/router/location';
import { LocationChangeAction } from 'connected-react-router';
import { CustomRouterActionTypes } from '../customRouter.types';

describe('customRouter.reducer', () => {
  it('Should handle LOCATION_CHANGE action', () => {
    const initialState = {
      ...CUSTOM_ROUTER_INITIAL_STATE,
    };
    const expectedState = produce(CUSTOM_ROUTER_INITIAL_STATE, draft => {
      draft.previousLocations.push(mockLocation);
    });

    const action: LocationChangeAction = {
      type: CustomRouterActionTypes.LOCATION_CHANGE,
      payload: {
        location: mockLocation,
        isFirstRendering: false,
        action: 'PUSH',
      },
    };
    const reducer = customRouterReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
