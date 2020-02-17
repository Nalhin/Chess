import { addToast, removeToast } from '../toaster.action';
import toasterReducer, { TOASTER_INITIAL_STATE } from '../toaster.reducer';
import { fakeToaster } from '../../../../test/fixtures/toaster/fakeToaster';

describe('Toast Reducer', () => {
  it('Should return the initial state', () => {
    const initialState = { ...TOASTER_INITIAL_STATE };
    const action = removeToast('0');

    const reducer = toasterReducer(undefined, action);

    expect(reducer).toEqual(initialState);
  });

  it('Should handle ADD_TOAST action type', () => {
    const initialState = {
      ...TOASTER_INITIAL_STATE,
    };
    const expectedState = {
      ...TOASTER_INITIAL_STATE,
      toasterData: [fakeToaster],
    };
    const action = addToast(fakeToaster);

    const reducer = toasterReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle REMOVE_TOAST type', () => {
    const initialState = {
      ...TOASTER_INITIAL_STATE,
      toasterData: [fakeToaster],
    };
    const expectedState = {
      ...TOASTER_INITIAL_STATE,
    };
    const action = removeToast(fakeToaster.id);

    const reducer = toasterReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
